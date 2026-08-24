"use client";

import { useState, useEffect } from "react";

export interface Companion {
  id: string;
  name: string;
  icon: string;
  credits?: string;
  creditsUrl?: string;
}

export const COMPANIONS: Companion[] = [
  {
    id: "classic",
    name: "Classic",
    icon: "/images/oneko/heads/classic.png",
    credits: "adryd325/oneko.js",
    creditsUrl: "https://github.com/adryd325/oneko.js",
  },
  {
    id: "dog",
    name: "Dog",
    icon: "/images/oneko/heads/dog.png",
    credits: "kyrie25",
    creditsUrl: "https://github.com/kyrie25",
  },
  {
    id: "maia",
    name: "Maia",
    icon: "/images/oneko/heads/maia.png",
    credits: "maia.crimew.gay",
    creditsUrl: "https://maia.crimew.gay",
  },
  {
    id: "tora",
    name: "Tora",
    icon: "/images/oneko/heads/tora.png",
    credits: "adryd325/oneko.js",
    creditsUrl: "https://github.com/adryd325/oneko.js",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    icon: "/images/oneko/heads/vaporwave.png",
    credits: "nya.rest",
    creditsUrl: "https://nya.rest",
  },
];

export default function NekoSelector() {
  const [open, setOpen] = useState(false);
  const [currentSkin, setCurrentSkin] = useState<string>("maia");

  useEffect(() => {
    const skinParam = new URLSearchParams(window.location.search).get("neko");
    if (skinParam && COMPANIONS.some((c) => c.id === skinParam)) {
      setCurrentSkin(skinParam);
    }
  }, []);

  const activeCompanion =
    COMPANIONS.find((c) => c.id === currentSkin) || COMPANIONS[2]; // Default to Maia

  const selectCompanion = (c: Companion) => {
    setCurrentSkin(c.id);
    setOpen(false);

    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set("neko", c.id);
    window.history.replaceState({}, "", url.toString());

    // Dispatch event for Oneko animation
    window.dispatchEvent(
      new CustomEvent("onekoVariantChanged", { detail: { variant: c.id } })
    );
  };

  return (
    <div className="fixed top-4 left-4 z-40 select-none">
      <div className="relative">
        {/* Toggle Pill Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-2xl border border-base-content/20 bg-base-300/85 px-3 py-1.5 shadow-xl backdrop-blur-md font-mono text-sm text-base-content hover:border-primary/50 transition-all cursor-pointer"
          title="Switch Companion"
        >
          <img
            src={activeCompanion.icon}
            alt={activeCompanion.name}
            className="size-5 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="font-bold text-base-content/90">
            {activeCompanion.name}
          </span>
          <span
            className={`text-xs text-base-content/60 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            {open ? "▲" : "▼"}
          </span>
        </button>

        {/* Dropdown Menu (Exact match with uploaded reference) */}
        {open && (
          <div className="absolute left-0 mt-2 w-44 overflow-hidden rounded-2xl border border-base-content/20 bg-base-300/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-150">
            {COMPANIONS.map((c) => {
              const isSelected = c.id === currentSkin;
              return (
                <button
                  key={c.id}
                  onClick={() => selectCompanion(c)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-mono transition-all text-left cursor-pointer ${
                    isSelected
                      ? "bg-primary/25 text-primary font-bold shadow-sm"
                      : "hover:bg-base-content/10 text-base-content/80 hover:text-base-content"
                  }`}
                >
                  <img
                    src={c.icon}
                    alt={c.name}
                    className="size-5 object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <span className="flex-1">{c.name}</span>
                  {isSelected && <span className="text-primary text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
