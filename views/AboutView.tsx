"use client";

import { useState } from "react";
import { site } from "@/lib/config";

const aboutCodeString = `// Developer profile & background
interface Developer {
  name: string;
  role: string;
  location: string;
  languages: string[];
  frameworks: string[];
  hobbies: string[];
  status: string;
}

const iamBread: Developer = {
  name: "${site.name}",
  role: "Software Developer & Student",
  location: "Vietnam",
  languages: ["TypeScript", "JavaScript", "Python", "C++", "Java"],
  frameworks: ["React", "Next.js", "Node.js", "Tailwind CSS", "DaisyUI"],
  hobbies: ["Coding", "Gaming", "Minecraft Mods", "Music", "Cats"],
  status: "Contemplating new architectures 💭 ( ˘-˘ )",
};

export default iamBread;`;

export default function AboutView() {
  const [isPlainText, setIsPlainText] = useState(false);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-300">
      <div className="card w-full max-w-4xl border border-base-content/15 bg-base-200/95 shadow-2xl backdrop-blur-xl">
        <div className="card-body p-5 sm:p-8">
          {/* Top Action Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-content/10 pb-4">
            <h1 className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              /about
            </h1>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlainText(!isPlainText)}
                className="btn btn-soft btn-accent btn-sm font-mono text-xs cursor-pointer"
              >
                Switch to {isPlainText ? "Code" : "Plain Text"}
              </button>

              <a
                href="#home"
                className="btn btn-soft btn-secondary btn-sm font-mono text-xs cursor-pointer"
              >
                ← Back
              </a>
            </div>
          </div>

          {/* Content Area */}
          <div className="mt-4">
            {isPlainText ? (
              <div className="space-y-4 font-sans text-base leading-relaxed text-base-content/90 bg-base-300/60 p-5 rounded-xl border border-base-content/10">
                {site.about.paragraphs.map((p, i) => (
                  <p key={i} className="block">
                    {p}
                  </p>
                ))}

                <div className="pt-2 border-t border-base-content/10">
                  <h3 className="font-mono text-xs uppercase font-bold text-accent tracking-wider mb-2">
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {site.about.skills.map((s) => (
                      <span
                        key={s}
                        className="badge badge-outline badge-accent font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mockup-code bg-base-300/80 text-xs sm:text-sm font-mono border border-base-content/10 rounded-xl overflow-x-auto shadow-inner">
                {aboutCodeString.split("\n").map((line, idx) => (
                  <pre key={idx} data-prefix={idx + 1}>
                    <code>{line}</code>
                  </pre>
                ))}
              </div>
            )}
          </div>

          {/* GitHub Stats Cards */}
          <div className="mt-6 pt-4 border-t border-base-content/10">
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-base-content/60 mb-3">
              Developer Statistics:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <img
                src="https://github-readme-stats.vercel.app/api?username=akk1to&show_icons=true&theme=catppuccin_mocha&line_height=30"
                alt="GitHub Stats"
                className="w-full rounded-lg border border-base-content/10"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=akk1to&theme=catppuccin_mocha&layout=compact"
                alt="Top Languages"
                className="w-full rounded-lg border border-base-content/10"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
