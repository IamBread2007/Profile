"use client";

import { useEffect, useState } from "react";
import { COMPANIONS, DEFAULT_COMPANION_ID } from "@/components/NekoSelector";

export default function RetroBadges() {
  const [skin, setSkin] = useState<string>(DEFAULT_COMPANION_ID);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("neko");
    if (param) setSkin(param);

    const onChange = (e: Event) => {
      const variant = (e as CustomEvent<{ variant: string }>).detail?.variant;
      if (variant) setSkin(variant);
    };
    window.addEventListener("onekoVariantChanged", onChange);
    return () => window.removeEventListener("onekoVariantChanged", onChange);
  }, []);

  const companion =
    COMPANIONS.find((c) => c.id === skin) ??
    COMPANIONS.find((c) => c.id === DEFAULT_COMPANION_ID)!;

  return (
    <footer className="mt-10 mb-4 flex flex-col items-center select-none text-center max-w-xl w-full">
      {/* Attribution footer */}
      <p className="text-xs sm:text-[13px] font-mono text-base-content/40 leading-relaxed">
        Current oneko animation by{" "}
        <a
          href={companion.creditsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-base-content/70"
        >
          {companion.credits}
        </a>{" "}
        - This profile is a fork from{" "}
        <a
          href="https://stefdp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-base-content/70"
        >
          stefdp.com
        </a>
        .
      </p>
    </footer>
  );
}
