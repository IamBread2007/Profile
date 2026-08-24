import type { IconName } from "@/components/SocialLinks";

export const site = {
  title: "IamBread",
  description: "Passionate developer.",
  name: "IamBread",
  tagline: "developer • hcmuter • cat person",

  // Avatar image placed inside the circular frame
  avatarUrl: "/avatar.jpg",

  // Contemplative thinking expression
  thinkingExpression: {
    emoji: "💭",
    kaomoji: "( ˘-˘ )",
    label: "Contemplating...",
  },

  // Full-bleed background image for the hero.
  backgroundImageUrl: "/background.png",
  // Darkens the hero background image (0 = invisible, 1 = solid).
  backgroundOpacity: 0.45,

  // Your birthday, used for the age + countdown line.
  birthday: { year: 2000, month: 1, day: 1 },

  // Discord user ID (numbers only) to power the live statuses via Lanyard.
  // Join https://discord.gg/lanyard with the bot once to activate it.
  // Leave "" to show static placeholder statuses.
  discordUserId: "",

  socials: [
    { icon: "mail", label: "Mail", href: "mailto:ssdarealeast@proton.me" },
    { icon: "discord", label: "Discord", href: "https://discord.com/users/0" },
    { icon: "github", label: "GitHub", href: "https://github.com/akk1to" },
    { icon: "instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "reddit", label: "Reddit", href: "https://reddit.com" },
    { icon: "spotify", label: "Spotify", href: "https://open.spotify.com" },
    { icon: "steam", label: "Steam", href: "https://steamcommunity.com" },
    { icon: "telegram", label: "Telegram", href: "https://t.me" },
    { icon: "tiktok", label: "TikTok", href: "https://tiktok.com" },
    { icon: "youtube", label: "YouTube", href: "https://youtube.com" },
  ] satisfies SocialLink[],

  music: {
    title: "co cong mai sac",
    artist: "remix",
    coverUrl: "/avatar.jpg",
  },

  terminalBootSequence: [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "> IamBread :: developer • hcmuter • thinker" },
    { type: "cmd", text: "./init-profile.sh" },
    { type: "out", text: "[✓] Ready to launch interface!" },
  ],

  terminalLines: [
    "$ whoami",
    "> IamBread / developer & hcmuter",
    "$ neko --follow",
    "> meow :3",
  ],

  blog: {
    heading: "/blog",
    posts: [
      {
        title: "Welcome to my portfolio",
        date: "2026-08-20",
        summary:
          "A brief look into how this site was built with Next.js, Tailwind, and DaisyUI.",
        url: "#",
      },
      {
        title: "Setting up Lanyard & Discord Rich Presence",
        date: "2026-08-15",
        summary: "Real-time presence updates using WebSocket and Lanyard API.",
        url: "#",
      },
    ],
  },

  about: {
    heading: "/about",
    paragraphs: [
      "Hi! I'm a passionate developer who enjoys building small, fast things for the web.",
      "When I'm not coding you'll find me gaming, listening to music, or experimenting with new web interfaces.",
    ],
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Python",
    ],
  },

  projects: [
    {
      name: "This website",
      description:
        "My personal profile page — built with Next.js, Tailwind and DaisyUI.",
      tech: ["Next.js", "Tailwind CSS", "DaisyUI"],
      url: "https://example.com",
      repo: "https://github.com/akk1to/profile",
    },
    {
      name: "Discord Presence Widget",
      description:
        "Real-time Spotify and code editor status integration via Lanyard API.",
      tech: ["TypeScript", "WebSocket"],
      url: "https://example.com",
      repo: "https://github.com/akk1to",
    },
  ] satisfies Project[],

  neko: {
    enabled: true,
    defaultSkin: "oneko",
  },
} as const;

export type SocialLink = {
  icon: IconName;
  label: string;
  href: string;
};

export type Project = {
  name: string;
  description: string;
  tech?: readonly string[];
  url?: string;
  repo?: string;
};
