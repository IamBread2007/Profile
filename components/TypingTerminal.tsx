"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";

export default function TypingTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const total = site.terminalLines.length;
    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (cancelled) return;
      const line = site.terminalLines[lineIndex];

      if (charIndex <= line.length) {
        setCurrent(line.slice(0, charIndex));
        charIndex += 1;
        timer = setTimeout(tick, 45);
        return;
      }

      setLines((prev) => [...prev.slice(-(total - 1)), line]);
      setCurrent("");
      charIndex = 0;
      lineIndex = (lineIndex + 1) % total;

      if (lineIndex === 0) {
        setLines([]);
        timer = setTimeout(tick, 2500);
      } else {
        timer = setTimeout(tick, 550);
      }
    }

    timer = setTimeout(tick, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden px-3 py-2 font-mono transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="whitespace-pre-wrap text-sm leading-relaxed text-base-content/30 sm:text-base">
        {lines.map((line, i) => (
          <div key={`${i}-${line}`}>{line}</div>
        ))}
        <div className="caret">{current}</div>
      </div>
    </div>
  );
}
