"use client";

import { useEffect, useState, useRef, useCallback } from "react";

type TerminalIntroProps = {
  onComplete: () => void;
};

const SCRIPT_LINES = [
  { type: "prompt", text: "whoami" },
  { type: "output", text: "Alexoy Vladimirov — passionate developer" },
  { type: "prompt", text: "cat ./status.txt" },
  { type: "output", text: "developer • tinkerer • cat person ( ˘-˘ ) 💭" },
  { type: "prompt", text: "./init-profile.sh --theme catppuccin-macchiato" },
  { type: "output", text: "[✓] Loading profile metadata and avatar..." },
  { type: "output", text: "[✓] Connecting to Discord Lanyard WebSocket gateway..." },
  { type: "output", text: "[✓] Summoning companion neko..." },
  { type: "output", text: "[✓] Initializing interface components..." },
  { type: "prompt", text: "launch --gui" },
  { type: "output", text: "Launching profile interface in 3.. 2.. 1.." },
];

export default function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [renderedLines, setRenderedLines] = useState<Array<{ type: "prompt" | "output"; text: string }>>([]);
  const [currentTyping, setCurrentTyping] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [fading, setFading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      onComplete();
    }, 650);
  }, [fading, onComplete]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [renderedLines, currentTyping]);

  // Keyboard shortcut to skip
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        finish();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finish]);

  // Typing state machine
  useEffect(() => {
    if (fading) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    if (step >= SCRIPT_LINES.length) {
      const timer = setTimeout(() => {
        finish();
      }, 500);
      return () => clearTimeout(timer);
    }

    const currentItem = SCRIPT_LINES[step];

    if (currentItem.type === "prompt") {
      let charIndex = 0;
      setCurrentTyping("");
      const textToType = currentItem.text;

      const interval = setInterval(() => {
        charIndex += 1;
        setCurrentTyping(textToType.slice(0, charIndex));

        if (charIndex >= textToType.length) {
          clearInterval(interval);
          setTimeout(() => {
            setRenderedLines((prev) => [...prev, { type: "prompt", text: textToType }]);
            setCurrentTyping("");
            setStep((s) => s + 1);
          }, 200);
        }
      }, 35);

      return () => clearInterval(interval);
    } else {
      // Output lines print with brief delay
      const outTimer = setTimeout(() => {
        setRenderedLines((prev) => [...prev, { type: "output", text: currentItem.text }]);
        setStep((s) => s + 1);
      }, 120);

      return () => clearTimeout(outTimer);
    }
  }, [step, fading, finish]);

  return (
    <div
      onClick={finish}
      className={`fixed inset-0 z-50 flex flex-col bg-base-300 p-4 sm:p-8 font-mono text-sm sm:text-base select-none cursor-pointer transition-opacity duration-700 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-base-content/10 pb-3 mb-4 text-xs text-base-content/50">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ed8796] inline-block" />
          <span className="size-3 rounded-full bg-[#eed49f] inline-block" />
          <span className="size-3 rounded-full bg-[#a6da95] inline-block" />
          <span className="ms-2 text-base-content/70">alexoy@profile:~ (zsh)</span>
        </div>
        <div className="text-accent animate-pulse">
          Click anywhere or press [Enter] to skip ↵
        </div>
      </div>

      {/* Terminal Lines Output */}
      <div className="flex-1 overflow-y-auto leading-relaxed space-y-1.5 scrollbar-thin scrollbar-thumb-base-content/10">
        <div className="text-base-content/40 text-xs mb-3">
          Last login: {new Date().toLocaleDateString()} on ttys000 • Linux 6.8.0-x86_64
        </div>

        {renderedLines.map((line, idx) => (
          <div key={idx} className="break-all">
            {line.type === "prompt" ? (
              <div className="flex items-center text-primary font-bold">
                <span className="text-accent me-2">$</span>
                <span>{line.text}</span>
              </div>
            ) : (
              <div className="text-base-content/80 ps-4 text-xs sm:text-sm">
                {line.text.startsWith("[✓]") ? (
                  <span className="text-success">{line.text}</span>
                ) : (
                  <span>{line.text}</span>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Current Typing Line */}
        {step < SCRIPT_LINES.length && SCRIPT_LINES[step]?.type === "prompt" && (
          <div className="flex items-center text-primary font-bold">
            <span className="text-accent me-2">$</span>
            <span>{currentTyping}</span>
            <span className="caret ms-0.5 inline-block" />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
