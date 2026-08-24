"use client";

import { useEffect, useRef } from "react";
import TypeIt from "typeit-react";
import handleTyping from "@/functions/loading";

interface Props {
  onComplete: () => void;
  hide: boolean;
}

export default function TerminalLoader({ onComplete, hide }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  function handleHideLoading() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete();
  }

  useEffect(() => {
    // Expose for onclick handler in TypeIt html
    (window as unknown as { __hideLoading?: () => void }).__hideLoading = handleHideLoading;

    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === "Shift" || event.key === "Enter" || event.key === " " || event.key === "Escape") {
        handleHideLoading();
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Auto-scroll terminal down as new lines appear
  useEffect(() => {
    if (hide) return;
    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 100);
    return () => clearInterval(interval);
  }, [hide]);

  return (
    <div
      ref={containerRef}
      className={`${
        hide ? "hidden pointer-events-none" : "flex"
      } fixed inset-0 z-50 flex-col bg-base-300 w-screen h-screen overflow-y-auto break-all p-3 sm:p-5 font-mono select-none`}
    >
      <TypeIt
        className="font-mono text-base-content text-sm sm:text-base whitespace-pre-wrap leading-relaxed"
        getBeforeInit={(instance) => {
          handleTyping(instance, handleHideLoading);
          return instance;
        }}
      />

      {/* Skip Button */}
      {!hide && (
        <button
          type="button"
          onClick={handleHideLoading}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-success/40 bg-base-200/90 px-4 py-1.5 font-mono text-xs sm:text-sm text-success shadow-2xl backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-success/10 cursor-pointer"
        >
          Skip Loading (Press Shift / Enter) ↵
        </button>
      )}
    </div>
  );
}
