"use client";

import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa6";
import { TbCake, TbBrandVscode } from "react-icons/tb";
import { SiRiotgames } from "react-icons/si";
import { site } from "@/lib/config";
import { useStatuses } from "@/lib/lanyard";

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function birthdayInfo(now: Date) {
  const { year, month, day } = site.birthday;
  const isToday =
    now.getMonth() === month - 1 && now.getDate() === day;

  let target = new Date(now.getFullYear(), month - 1, day);
  if (!isToday && target.getTime() <= now.getTime()) {
    target = new Date(now.getFullYear() + 1, month - 1, day);
  }

  const age = now.getFullYear() - year;
  const msLeft = Math.max(0, target.getTime() - now.getTime());
  return { age, isToday, msLeft };
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${days} days ${hours}:${minutes}:${seconds}`;
}

export default function StatusLines() {
  const statuses = useStatuses();
  const now = useNow();

  const info = now ? birthdayInfo(now) : null;

  return (
    <div className="inline-flex flex-col items-start text-left gap-2.5 font-mono text-sm text-base-content/85 mx-auto">
      <p className="flex items-center gap-2.5">
        <TbCake className="size-5 shrink-0 text-accent" />
        {info ? (
          <span>
            {info.age} years old •{" "}
            {info.isToday ? (
              <span className="text-primary font-bold">Happy birthday! 🎂</span>
            ) : (
              <>{formatCountdown(info.msLeft)} until next birthday</>
            )}
          </span>
        ) : (
          <span>…</span>
        )}
      </p>

      <p className="flex items-center gap-2">
        <FaSpotify
          className={`size-5 ${statuses.spotify ? "text-[#1ed760]" : ""}`}
        />
        {statuses.enabled ? (
          statuses.spotify ? (
            <span>
              Listening to{" "}
              <a
                className="link link-hover text-accent"
                href={`https://open.spotify.com/track/${statuses.spotify.track_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {statuses.spotify.song}
              </a>{" "}
              by {statuses.spotify.artist}
            </span>
          ) : (
            <span>Not listening to anything</span>
          )
        ) : (
          <span>Not listening to anything</span>
        )}
      </p>

      <p className="flex items-center gap-2">
        <TbBrandVscode className="size-5" />
        {statuses.editor ? (
          <span>
            Coding in {statuses.editor.name}
            {statuses.editor.details ? ` — ${statuses.editor.details}` : ""}
          </span>
        ) : (
          <span>Not coding anything</span>
        )}
      </p>

      <p className="flex items-center gap-2">
        <SiRiotgames className="size-5" />
        {statuses.game ? <span>Playing {statuses.game.name}</span> : <span>Not playing anything</span>}
      </p>
    </div>
  );
}
