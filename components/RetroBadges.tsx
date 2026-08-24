"use client";

import { useState } from "react";

const BADGES = [
  { text: "1920x1080 best", bg: "#1e1e2e", border: "#89b4fa", color: "#cdd6f4" },
  { text: "I wish it was 2001!", bg: "#000080", border: "#ffffff", color: "#ffffff" },
  { text: "Buttons 2019!", bg: "#313244", border: "#f38ba8", color: "#f38ba8" },
  { text: "東方 Project", bg: "#181825", border: "#f9e2af", color: "#fab387" },
  { text: "ANONYMIZE NOW", bg: "#11111b", border: "#a6e3a1", color: "#a6e3a1" },
  { text: "Anti-NFT Site", bg: "#45475a", border: "#eba0ac", color: "#ffffff" },
  { text: "Anything But Chrome", bg: "#313244", border: "#89dceb", color: "#89dceb" },
  { text: "This is a Nice Site", bg: "#1e1e2e", border: "#cba6f7", color: "#cba6f7" },
  { text: "UNDER CONSTRUCTION", bg: "#f9e2af", border: "#181825", color: "#181825" },
  { text: "Powered by debian", bg: "#d20f39", border: "#ffffff", color: "#ffffff" },
  { text: "Discord NOW", bg: "#5865F2", border: "#ffffff", color: "#ffffff" },
];

export default function RetroBadges() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-6 flex flex-col items-center select-none text-center max-w-xl w-full">
      {/* Supporter Banner */}
      <div className="mb-2.5 w-full max-w-lg overflow-hidden rounded border border-[#f5bde6]/30 bg-gradient-to-r from-[#24273a]/90 via-[#363a4f]/80 to-[#24273a]/90 px-3.5 py-1.5 font-mono text-[11px] text-base-content/90 shadow-lg flex items-center justify-between backdrop-blur-sm">
        <span className="flex items-center gap-2">
          <span className="text-sm">🇦🇺</span>
          <span className="text-[#f5bde6] font-semibold text-[11px] sm:text-xs">
            proud supporter of the winner <strong className="text-[#c6a0f6]">mrekk</strong>
          </span>
        </span>
        <span className="font-bold text-[#eed49f] tracking-wider text-[10px] sm:text-xs">
          Mrekk \:D/
        </span>
      </div>

      {/* 88x31 Retro Badges Grid */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-lg">
        {(expanded ? BADGES : BADGES.slice(0, 8)).map((b, i) => (
          <div
            key={i}
            className="flex h-[31px] w-[88px] items-center justify-center rounded-[2px] border text-[9.5px] font-bold font-mono tracking-tighter shadow-sm transition-transform hover:scale-105"
            style={{
              backgroundColor: b.bg,
              borderColor: b.border,
              color: b.color,
              imageRendering: "pixelated",
            }}
          >
            {b.text}
          </div>
        ))}
      </div>

      {/* Toggle & Webring text */}
      <div className="mt-3 flex items-center gap-2 font-mono text-xs text-base-content/60">
        <button
          onClick={() => setExpanded(!expanded)}
          className="link link-hover text-accent cursor-pointer"
        >
          {expanded ? "Hide extra buttons" : "Show all buttons"}
        </button>
        <span>•</span>
        <span className="flex items-center gap-1">
          <span>💀</span>
          <span>This site isn't part of sillyring yet 3:</span>
        </span>
      </div>

      {/* Attribution footer */}
      <p className="mt-2 text-[11px] font-mono text-base-content/40 leading-relaxed">
        Current oneko animation by maia.crimew.gay • Profile fork for IamBread
      </p>
    </div>
  );
}
