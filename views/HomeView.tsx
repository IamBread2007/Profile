"use client";

import SocialLinks from "@/components/SocialLinks";
import StatusLines from "@/components/StatusLines";
import RetroBadges from "@/components/RetroBadges";
import { site } from "@/lib/config";

export default function HomeView() {
  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center overflow-x-hidden px-4 py-8 select-none">
      {/* Background Image & Ambient Scanline */}
      {site.backgroundImageUrl && (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
            style={{
              backgroundImage: `url('${site.backgroundImageUrl}')`,
              opacity: site.backgroundOpacity,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-base-300/40 via-base-300/70 to-base-300" />
        </div>
      )}

      {/* Main Single Centered Card (1:1 with visual.png & stefdp.com) */}
      <div className="flex flex-col items-center max-w-xl w-full text-center my-auto">
        {/* Circular Avatar Frame with Contemplative Expression */}
        <div className="relative mb-4 group">
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-30 blur-md transition-opacity duration-500 group-hover:opacity-70" />

          {/* Avatar Image */}
          <div className="relative size-28 sm:size-32 overflow-hidden rounded-full border-2 border-primary/50 bg-base-200 shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <img
              src={site.avatarUrl || "/avatar.jpg"}
              alt={site.name}
              className="size-full object-cover select-none"
            />
          </div>

          {/* Contemplative Thinking Expression Badge */}
          <div
            className="absolute -top-2 -right-3 z-20 flex items-center gap-1.5 rounded-full border border-primary/40 bg-base-200/95 px-2.5 py-1 text-xs font-mono text-primary shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-primary cursor-default"
            title={site.thinkingExpression.label}
          >
            <span className="text-sm">{site.thinkingExpression.emoji}</span>
            <span className="text-[11.5px] font-semibold tracking-tight text-accent">
              {site.thinkingExpression.kaomoji}
            </span>
          </div>
        </div>

        {/* Name with Online Dot */}
        <div className="flex items-center justify-center gap-2.5 my-1">
          <h1 className="font-mono text-3xl sm:text-4xl text-primary font-bold tracking-tight">
            {site.name}
          </h1>
          <span className="status-dot size-3 opacity-90" title="Online" />
        </div>

        {/* Social Links Row */}
        <div className="my-2">
          <SocialLinks />
        </div>

        {/* Navigation Hash Buttons (Direct View Switch) */}
        <div className="my-2.5 flex items-center justify-center gap-2 font-mono">
          <a
            href="#about"
            className="rounded-full bg-base-200/90 hover:bg-base-100 text-primary border border-base-content/15 px-4 py-1 text-xs font-semibold shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            /about
          </a>
          <a
            href="#projects"
            className="rounded-full bg-base-200/90 hover:bg-base-100 text-primary border border-base-content/15 px-4 py-1 text-xs font-semibold shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            /projects
          </a>
          <a
            href="#blog"
            className="rounded-full bg-base-200/90 hover:bg-base-100 text-primary border border-base-content/15 px-4 py-1 text-xs font-semibold shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            /blog
          </a>
        </div>

        {/* Live Status Lines */}
        <div className="w-full flex justify-center mt-2">
          <StatusLines />
        </div>

        {/* Retro 88x31 Badges & Webring */}
        <RetroBadges />
      </div>
    </div>
  );
}
