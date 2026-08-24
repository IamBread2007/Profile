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
    <div className="my-3 flex flex-wrap justify-center gap-2">
      {site.socials.map(({ icon, label, href }: SocialLink) => {
        const entry = ICONS[icon];
        if (!entry) return null;
        const { Icon, color } = entry;
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`My ${label} profile`}
            title={label}
            className="transition-transform duration-300 ease-in-out hover:scale-125 [&:hover]:text-(--social-color)"
            style={{ "--social-color": color } as CSSProperties}
          >
            <Icon className="size-8" />
          </a>
        );
      })}
    </div>
  );
}
