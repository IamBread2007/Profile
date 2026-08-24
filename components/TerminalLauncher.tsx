"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { site } from "@/lib/config";

type TerminalLauncherProps = {
  onLaunched?: () => void;
  isLaunched?: boolean;
};

export default function TerminalLauncher({ onLaunched, isLaunched = false }: TerminalLauncherProps) {
  const [history, setHistory] = useState<Array<{ type: "cmd" | "out"; text: string }>>([]);
  const [currentCmd, setCurrentCmd] = useState<string>("");
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(isLaunched);
  const [exiting, setExiting] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const finishLaunch = useCallback(() => {
    if (exiting || isDone) return;
    setExiting(true);
    setTimeout(() => {
      setIsDone(true);
      if (onLaunched) onLaunched();
    }, 600);
  }, [exiting, isDone, onLaunched]);

  // Auto-scroll terminal to bottom as lines appear
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentCmd]);

  // Keyboard shortcut to skip (Enter, Space, or Escape)
  useEffect(() => {
    if (isDone) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        finishLaunch();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDone, finishLaunch]);

  // Typing engine
  useEffect(() => {
    if (isDone || exiting) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishLaunch();
      return;
    }

    const sequence = site.terminalBootSequence;
    if (stepIndex >= sequence.length) {
      const exitTimer = setTimeout(() => {
        finishLaunch();
      }, 700);
      return () => clearTimeout(exitTimer);
    }

    const currentStep = sequence[stepIndex];

    if (currentStep.type === "cmd") {
      let charIdx = 0;
      setCurrentCmd("");
      const fullText = currentStep.text;

      const typeInterval = setInterval(() => {
        charIdx += 1;
        setCurrentCmd(fullText.slice(0, charIdx));

        if (charIdx >= fullText.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setHistory((prev) => [...prev, { type: "cmd", text: fullText }]);
            setCurrentCmd("");
            setStepIndex((s) => s + 1);
          }, 250);
        }
      }, 40);

      return () => clearInterval(typeInterval);
    } else {
      // Output line - appear with short delay
      const outTimer = setTimeout(() => {
        setHistory((prev) => [...prev, { type: "out", text: currentStep.text }]);
        setStepIndex((s) => s + 1);
      }, 180);

      return () => clearTimeout(outTimer);
    }
  }, [stepIndex, isDone, exiting, finishLaunch]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-base-300/90 backdrop-blur-md p-4 transition-all duration-700 ease-out ${
        exiting ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-base-content/20 bg-base-200/95 shadow-2xl backdrop-blur-xl">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between border-b border-base-content/10 bg-base-300/80 px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ed8796] inline-block shadow-sm" />
            <span className="size-3 rounded-full bg-[#eed49f] inline-block shadow-sm" />
            <span className="size-3 rounded-full bg-[#a6da95] inline-block shadow-sm" />
          </div>
          <span className="font-mono text-xs text-base-content/60">
            alexoy@localhost:~ (launch)
          </span>
          <button
            onClick={finishLaunch}
            className="rounded px-2 py-0.5 font-mono text-[11px] text-accent hover:bg-accent/10 transition-colors cursor-pointer"
            title="Skip launcher sequence"
          >
            Skip [↵]
          </button>
        </div>

        {/* Terminal Content */}
        <div className="h-72 sm:h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed sm:text-base scrollbar-thin scrollbar-thumb-base-content/10">
          <div className="text-base-content/40 text-xs mb-3">
            Last login: {new Date().toLocaleDateString()} on ttys001 • Profile Bootloader v2.0
          </div>

          {history.map((item, idx) => (
            <div key={idx} className="mb-1.5 break-all">
              {item.type === "cmd" ? (
                <div className="flex items-center text-primary font-semibold">
                  <span className="text-accent me-2 select-none">$</span>
                  <span>{item.text}</span>
                </div>
              ) : (
                <div className="text-base-content/85 ps-4 text-xs sm:text-sm">
                  {item.text.startsWith("[✓]") ? (
                    <span className="text-success">{item.text}</span>
                  ) : item.text.includes("💭") ? (
                    <span className="text-secondary italic">{item.text}</span>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Active typing command line */}
          <div className="flex items-center text-primary font-semibold">
            <span className="text-accent me-2 select-none">$</span>
            <span>{currentCmd}</span>
            <span className="caret ms-0.5 inline-block" />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer */}
        <div className="flex items-center justify-between border-t border-base-content/10 bg-base-300/50 px-4 py-2 text-[11px] font-mono text-base-content/50">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-success animate-pulse" />
            <span>Booting profile environment...</span>
          </div>
          <button
            onClick={finishLaunch}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Click or press <kbd className="kbd kbd-xs bg-base-100 text-accent">Enter</kbd> to enter
          </button>
        </div>
      </div>
    </div>
  );
}
