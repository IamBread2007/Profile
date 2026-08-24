"use client";

export default function RetroBadges() {
  return (
    <footer className="mt-10 mb-4 flex flex-col items-center select-none text-center max-w-xl w-full">
      {/* Attribution footer */}
      <p className="text-xs sm:text-[13px] font-mono text-base-content/40 leading-relaxed">
        Current oneko animation by{" "}
        <a
          href="https://maia.crimew.gay"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-base-content/70"
        >
          maia.crimew.gay
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
