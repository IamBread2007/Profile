"use client";

import { useState, useEffect } from "react";
import useHash from "@/hooks/useHash";
import HomeView from "@/views/HomeView";
import AboutView from "@/views/AboutView";
import ProjectsView from "@/views/ProjectsView";
import BlogView from "@/views/BlogView";
import TerminalLoader from "@/components/TerminalLoader";
import NekoSelector from "@/components/NekoSelector";
import MusicPlayer from "@/components/MusicPlayer";
import { LanyardProvider } from "@/lib/lanyard";

type PageView = "home" | "about" | "projects" | "blog";

export default function MainPage() {
  const hash = useHash();
  const [page, setPage] = useState<PageView>("home");
  const [hideLoading, setHideLoading] = useState<boolean>(false);

  useEffect(() => {
    if (hash === "about" || hash === "projects" || hash === "blog") {
      setPage(hash as PageView);
    } else {
      setPage("home");
    }
  }, [hash]);

  return (
    <LanyardProvider>
      {/* Terminal SSH & Apt Boot Sequence (stefdp.com style) */}
      <TerminalLoader
        hide={hideLoading}
        onComplete={() => setHideLoading(true)}
      />

      {/* Main App Container */}
      <div
        className={`relative min-h-[100dvh] transition-opacity duration-700 ease-out ${
          hideLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top-Left Companion Selector */}
        <NekoSelector />

        {/* View Switcher (1:1 Architecture with stefdp.com) */}
        <main className="relative min-h-[100dvh] overflow-x-hidden">
          {page === "home" && <HomeView />}
          {page === "about" && <AboutView />}
          {page === "projects" && <ProjectsView />}
          {page === "blog" && <BlogView />}
        </main>

        {/* Bottom-Right Floating Music Player */}
        <MusicPlayer />
      </div>
    </LanyardProvider>
  );
}
