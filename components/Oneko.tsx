"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/config";
import { getNekoSpriteUrl } from "@/lib/security";

const SPRITE_SIZE = 32;
const NEKO_SPEED = 10;

type SpriteFrame = readonly [number, number];

const SPRITE_SETS: Record<string, readonly SpriteFrame[]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

function resolveSpriteUrl(variant?: string): string {
  const skin =
    variant ||
    (typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("neko")
      : null) ||
    "maia";

  return getNekoSpriteUrl(skin);
}

export default function Oneko() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!site.neko.enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;
    const element: HTMLDivElement = el;

    let raf = 0;
    let disposed = false;

    let nekoPosX = window.innerWidth / 2;
    let nekoPosY = window.innerHeight / 2;
    let mousePosX = nekoPosX;
    let mousePosY = nekoPosY;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    let lastFrameTimestamp: number | undefined;

    element.style.backgroundImage = `url("${resolveSpriteUrl()}")`;
    element.style.left = `${nekoPosX - SPRITE_SIZE / 2}px`;
    element.style.top = `${nekoPosY - SPRITE_SIZE / 2}px`;

    // Dynamic skin switcher event listener
    function handleVariantChanged(e: Event) {
      const customEvent = e as CustomEvent<{ variant: string }>;
      if (customEvent.detail?.variant) {
        element.style.backgroundImage = `url("${resolveSpriteUrl(customEvent.detail.variant)}")`;
      }
    }

    window.addEventListener("onekoVariantChanged", handleVariantChanged);

    function setSprite(name: string, frame: number) {
      const frames = SPRITE_SETS[name];
      const sprite = frames[frame % frames.length];
      element.style.backgroundPosition = `${sprite[0] * SPRITE_SIZE}px ${sprite[1] * SPRITE_SIZE}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation == null
      ) {
        const availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
        if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32)
          availableIdleAnimations.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32)
          availableIdleAnimations.push("scratchWallS");
        idleAnimation =
          availableIdleAnimations[
            Math.floor(Math.random() * availableIdleAnimations.length)
          ];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < NEKO_SPEED || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      nekoPosX -= (diffX / distance) * NEKO_SPEED;
      nekoPosY -= (diffY / distance) * NEKO_SPEED;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      element.style.left = `${nekoPosX - SPRITE_SIZE / 2}px`;
      element.style.top = `${nekoPosY - SPRITE_SIZE / 2}px`;
    }

    function onMouseMove(event: MouseEvent) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    }

    function onAnimation(timestamp: number) {
      if (disposed || !element.isConnected) return;
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      raf = window.requestAnimationFrame(onAnimation);
    }

    document.addEventListener("mousemove", onMouseMove);
    raf = window.requestAnimationFrame(onAnimation);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("onekoVariantChanged", handleVariantChanged);
    };
  }, []);

  if (!site.neko.enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed z-[2147483647] size-8"
      style={{
        imageRendering: "pixelated",
        backgroundImage: "url(/images/oneko/maia.gif)",
      }}
    />
  );
}
