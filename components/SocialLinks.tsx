"use client";

import type { ComponentType, CSSProperties } from "react";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaReddit,
  FaSpotify,
  FaSteam,
  FaTelegram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import type { SocialLink } from "@/lib/config";
import { site } from "@/lib/config";

export type IconName =
  | "mail"
  | "github"
  | "discord"
  | "telegram"
  | "spotify"
  | "steam"
  | "youtube"
  | "reddit"
  | "instagram"
  | "tiktok"
  | "x";

const ICONS: Record<
  IconName,
  {
    Icon: ComponentType<{ size?: number | string; className?: string }>;
    color: string;
  }
> = {
  mail: { Icon: TbMailFilled, color: "#bf211e" },
  github: { Icon: FaGithub, color: "#ffffff" },
  discord: { Icon: FaDiscord, color: "#5865F2" },
  telegram: { Icon: FaTelegram, color: "#27a3e3" },
  spotify: { Icon: FaSpotify, color: "#1ed760" },
  steam: { Icon: FaSteam, color: "#66c0f4" },
  youtube: { Icon: FaYoutube, color: "#ff0033" },
  reddit: { Icon: FaReddit, color: "#ff4500" },
  instagram: { Icon: FaInstagram, color: "#ff0069" },
  tiktok: { Icon: FaTiktok, color: "#fe2752" },
  x: { Icon: FaXTwitter, color: "#ffffff" },
};

export default function SocialLinks() {
  return (
    <div className="my-3 flex flex-wrap justify-center gap-2.5 sm:gap-3.5">
      {site.socials.map(({ icon, label, href, username }: SocialLink) => {
        const entry = ICONS[icon];
        if (!entry) return null;
        const { Icon, color } = entry;
        const displayUsername = username || label;

        return (
          <div key={label} className="relative group flex flex-col items-center">
            {/* Speech Bubble Popup Tooltip (1:1 with stefdp.com) */}
            <div className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 opacity-0 scale-90 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
              <div className="whitespace-nowrap rounded-full bg-white px-3.5 py-1 text-xs sm:text-sm font-bold text-[#151b23] shadow-2xl tracking-tight select-none">
                {label}: {displayUsername}
              </div>
              {/* Downward pointing triangle arrow */}
              <div className="size-0 border-x-[6px] border-x-transparent border-t-[7px] border-t-white -mt-[1px]" />
            </div>

            {/* Social Link Icon */}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`My ${label} profile`}
              className="relative p-1 transition-transform duration-300 ease-in-out hover:scale-125 [&:hover]:text-(--social-color) text-base-content/90 cursor-pointer"
              style={{ "--social-color": color } as CSSProperties}
            >
              <Icon className="size-8 sm:size-9" />
            </a>
          </div>
        );
      })}
    </div>
  );
}
