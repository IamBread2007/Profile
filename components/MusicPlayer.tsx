"use client";

import { useState } from "react";
import { FaPlay, FaPause, FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { site } from "@/lib/config";
import { useStatuses } from "@/lib/lanyard";

export default function MusicPlayer() {
  const statuses = useStatuses();
  const [isPlaying, setIsPlaying] = useState(false);

  // If Spotify is active via Lanyard, prioritize real Spotify track
  const track = statuses.spotify
    ? {
        title: statuses.spotify.song,
        artist: statuses.spotify.artist,
        cover: statuses.spotify.album_art_url || site.avatarUrl || "/avatar.jpg",
        url: `https://open.spotify.com/track/${statuses.spotify.track_id}`,
      }
    : {
        title: site.music.title,
        artist: site.music.artist,
        cover: site.music.coverUrl || site.avatarUrl || "/avatar.jpg",
        url: "#",
      };

  return (
    <div
      aria-label="Music player widget"
      className="pointer-events-auto fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-lg border border-base-content/15 bg-base-300/85 px-3 py-2 shadow-2xl backdrop-blur-md select-none transition-transform duration-300 hover:scale-102 max-w-[280px] sm:max-w-xs"
    >
      {/* Album Art */}
      <div className="relative size-10 shrink-0 overflow-hidden rounded border border-base-content/10 bg-base-200">
        <img
          src={track.cover}
          alt={track.title}
          className="size-full object-cover"
        />
        {isPlaying && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="inline-block size-2 rounded-full bg-success animate-ping" />
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="min-w-0 flex-1 font-mono">
        <p className="truncate text-xs font-bold text-base-content" title={track.title}>
          {track.title}
        </p>
        <p className="truncate text-[10.5px] text-base-content/60" title={track.artist}>
          {track.artist}
        </p>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-1.5 text-base-content/70">
        <button
          className="p-1 hover:text-primary transition-colors cursor-pointer text-xs"
          title="Previous"
          aria-label="Previous track"
        >
          <FaBackwardStep />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1.5 hover:text-accent transition-colors cursor-pointer text-sm"
          title={isPlaying ? "Pause" : "Play"}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className="p-1 hover:text-primary transition-colors cursor-pointer text-xs"
          title="Next"
          aria-label="Next track"
        >
          <FaForwardStep />
        </button>
      </div>
    </div>
  );
}
