"use client";

import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { site } from "@/lib/config";

type PlaybackData = {
  position: number;
  duration: number;
  isBuffering?: boolean;
  isPaused?: boolean;
  playingURI?: string;
};

type EmbedController = {
  play: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  addListener: (
    event: string,
    callback: (event: { data: PlaybackData }) => void,
  ) => void;
};

type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: {
      width: string | number;
      height: string | number;
      uri?: string;
      url?: string;
    },
    callback: (controller: EmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    __spotifyIFrameAPI?: SpotifyIFrameAPI;
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

const EMBED_SCRIPT = "https://open.spotify.com/embed/iframe-api/v1";

function extractSpotifyUri(url: string): string | null {
  const match = url.match(
    /open\.spotify\.com\/(?:intl-[a-zA-Z]+\/)?(playlist|track|album|artist|episode|show)\/([A-Za-z0-9]+)/,
  );
  return match ? `spotify:${match[1]}:${match[2]}` : null;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function MusicPlayer() {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<EmbedController | null>(null);
  // Refs mirror playback state for use inside long-lived event handlers
  // (state values go stale in useEffect closures).
  const hasPlayedRef = useRef(false);
  const playingRef = useRef(false);
  const lastUriRef = useRef<string | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackTitle, setTrackTitle] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  // Fetch title + artwork for the currently playing embed track.
  // Spotify's public oEmbed endpoint is CORS-enabled (no auth required).
  async function loadTrackMeta(uri: string) {
    const match = uri.match(/spotify:(?:track|episode):([A-Za-z0-9]+)/);
    if (!match) return;
    try {
      const res = await fetch(
        `https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/track/${match[1]}`)}`,
      );
      if (!res.ok) return;
      const meta = (await res.json()) as { title?: string; thumbnail_url?: string };
      if (meta.title) setTrackTitle(meta.title);
      if (meta.thumbnail_url) setCoverUrl(meta.thumbnail_url);
    } catch {}
  }

  useEffect(() => {
    const uri = extractSpotifyUri(site.music.playlistUrl ?? "");
    const host = hostRef.current;
    if (!uri || !host) return;

    let disposed = false;

    function boot(api: SpotifyIFrameAPI) {
      if (controllerRef.current || disposed || !host || !uri) return;

      api.createController(host, { width: 240, height: 80, uri }, (controller) => {
        if (disposed) return;
        controllerRef.current = controller;
        setReady(true);

        // Try autoplay the moment the embed can stream. Browsers usually
        // block unmuted autoplay until first interaction — the global
        // unlock handler below retries on the visitor's first click/key.
        controller.addListener("ready", () => {
          try {
            controller.play();
          } catch {}
        });

        controller.addListener("playback_update", ({ data }) => {
          if (typeof data.position === "number") setPosition(data.position);
          if (typeof data.duration === "number") setDuration(data.duration);
          const isPlaying = data.isPaused === false;
          playingRef.current = isPlaying;
          setPlaying(isPlaying);
          if (isPlaying) {
            hasPlayedRef.current = true;
            setHasPlayed(true);
          }
          // New track started in the embed — refresh title + artwork
          if (data.playingURI && data.playingURI !== lastUriRef.current) {
            lastUriRef.current = data.playingURI;
            void loadTrackMeta(data.playingURI);
          }
        });
      });
    }

    if (window.__spotifyIFrameAPI) {
      boot(window.__spotifyIFrameAPI);
    } else {
      window.onSpotifyIframeApiReady = (api) => {
        window.__spotifyIFrameAPI = api;
        boot(api);
      };
      if (!document.querySelector(`script[src^="${EMBED_SCRIPT}"]`)) {
        const script = document.createElement("script");
        script.src = EMBED_SCRIPT;
        script.async = true;
        document.body.appendChild(script);
      }
    }

    // Autoplay unlock: start playback ONLY on the very first interaction,
    // and only when nothing is playing. Refs keep this handler correct —
    // reading state here would be a permanently stale closure.
    const unlock = () => {
      if (hasPlayedRef.current || playingRef.current) return;
      controllerRef.current?.play();
    };
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);

    return () => {
      disposed = true;
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    const controller = controllerRef.current;
    if (!controller) return;
    if (playing) controller.pause();
    else controller.play();
  };

  const percent = duration > 0 ? Math.min(100, (position / duration) * 100) : 0;

  const statusText = !ready
    ? "connecting to spotify…"
    : playing
      ? "playing • spotify"
      : hasPlayed
        ? "paused"
        : "click anywhere to start";

  return (
    <div
      aria-label="Music player widget"
      className="pointer-events-auto fixed bottom-5 right-5 z-40 w-[240px] sm:w-[260px] select-none"
    >
      {/* Hidden-but-alive embed host — this is the actual audio source */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 right-0 size-px overflow-hidden opacity-0"
      >
        <div ref={hostRef} />
      </div>

      <div className="overflow-hidden rounded-lg border border-base-content/15 bg-base-300/85 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]">
        <div className="flex items-center gap-2.5 px-2.5 py-2">
          {/* Album Art with live equalizer while playing */}
          <div className="relative size-10 shrink-0 overflow-hidden rounded border border-base-content/10 bg-base-200">
            <img
              src={coverUrl || site.music.coverUrl || "/avatar.jpg"}
              alt={trackTitle || site.music.title}
              className="size-full object-cover"
            />
            {playing && (
              <div className="absolute inset-0 flex items-end justify-center gap-[3px] bg-black/35 pb-1.5">
                <span className="h-1.5 w-[3px] animate-pulse rounded-full bg-[#1ed760]" />
                <span className="h-2.5 w-[3px] animate-pulse rounded-full bg-[#1ed760] [animation-delay:-0.4s]" />
                <span className="h-2 w-[3px] animate-pulse rounded-full bg-[#1ed760] [animation-delay:-0.8s]" />
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="min-w-0 flex-1 font-mono">
            <p
              className="truncate text-xs font-bold text-base-content"
              title={trackTitle || site.music.title}
            >
              {trackTitle || site.music.title}
            </p>
            <p
              className={`truncate text-[10.5px] ${
                ready && !playing && !hasPlayed
                  ? "text-accent"
                  : "text-base-content/60"
              }`}
              title={statusText}
            >
              {statusText}
            </p>
          </div>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            disabled={!ready}
            title={playing ? "Pause" : "Play"}
            aria-label={playing ? "Pause music" : "Play music"}
            className={`rounded-full p-2 font-mono transition-all cursor-pointer ${
              ready
                ? "text-base-content/80 hover:bg-base-content/10 hover:text-accent active:scale-90"
                : "opacity-40"
            } ${!hasPlayed && ready ? "animate-pulse text-accent" : ""}`}
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 px-2.5 pb-1.5 font-mono text-[9px] text-base-content/50">
          <span className="tabular-nums">{formatTime(position)}</span>
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-base-content/10">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500 ease-linear"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
