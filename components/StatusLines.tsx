"use client";

import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa6";
import { TbCake, TbBrandVscode } from "react-icons/tb";
import { site } from "@/lib/config";
import { useStatuses } from "@/lib/lanyard";

function KuroGamesIcon({ className }: { className?: string }) {
  return (
    <img
      src="/images/kuro-games-icon.png"
      alt="Kuro Games"
      className={`${className || "size-5"} object-contain shrink-0`}
    />
  );
}

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
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentDate = now.getDate();

  // True for the whole day of birthday (31/08)
  const isToday = currentMonth === month && currentDate === day;

  // Calculate current age
  let age = currentYear - year;
  if (currentMonth < month || (currentMonth === month && currentDate < day)) {
    age = currentYear - year - 1;
  }

  // Next birthday target
  let nextBirthday = new Date(currentYear, month - 1, day, 0, 0, 0, 0);
  if (now.getTime() >= nextBirthday.getTime()) {
    nextBirthday = new Date(currentYear + 1, month - 1, day, 0, 0, 0, 0);
  }

  const msLeft = Math.max(0, nextBirthday.getTime() - now.getTime());
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
            {info.isToday ? (
              <span className="text-primary font-bold">
                🎂 Happy Birthday! 🎉 Wishing you a wonderful and joyful day!
              </span>
            ) : (
              <>
                {info.age} years old • {formatCountdown(info.msLeft)} until next birthday
              </>
            )}
          </span>
        ) : (
          <span>…</span>
        )}
      </p>

      <p className="flex items-center gap-2">
        <FaSpotify
          className={`size-5 shrink-0 ${statuses.spotify ? "text-[#1ed760]" : ""}`}
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
        <TbBrandVscode className="size-5 shrink-0" />
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
        <KuroGamesIcon className="size-5 shrink-0" />
        {statuses.game ? <span>Playing {statuses.game.name}</span> : <span>Not playing anything</span>}
      </p>
    </div>
  );
}
