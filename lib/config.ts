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
  birthday: { year: 2007, month: 8, day: 31 },

  // Discord user ID (numbers only) to power the live statuses via Lanyard.
  // Join https://discord.gg/lanyard with the bot once to activate it.
  discordUserId: "1193932492856635473",

  socials: [
    {
      icon: "mail",
      label: "Mail",
      href: "mailto:quangvinh2wb2007@gmail.com",
      username: "quangvinh2wb2007@gmail.com",
    },
    {
      icon: "discord",
      label: "Discord",
      href: "https://discord.com/users/1193932492856635473",
      username: "iambread0752",
    },
    {
      icon: "github",
      label: "GitHub",
      href: "https://github.com/IamBread2007",
      username: "IamBread2007",
    },
    {
      icon: "reddit",
      label: "Reddit",
      href: "https://www.reddit.com/user/IamBread24112007/",
      username: "IamBread24112007",
    },
    {
      icon: "spotify",
      label: "Spotify",
      href: "https://open.spotify.com/user/31ijvweuahifkjty65ripwies3fi",
      username: "IamBread",
    },
    {
      icon: "telegram",
      label: "Telegram",
      href: "https://t.me/lamBread207",
      username: "lamBread207",
    },
    {
      icon: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com/@iambread817",
      username: "@iambread817",
    },
    {
      icon: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@vinh230",
      username: "@vinh230",
    },
  ] satisfies SocialLink[],

  music: {
    title: "Spotify Playlist",
    artist: "Spotify",
    coverUrl: "/avatar.jpg",

    // Spotify URL powering the floating music box (playlist, album, or track).
    // Played through the official Spotify Embed — visitors hear it without logging in.
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1E8OLVmeMeYOIh",
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
      name: "VJisho",
      description:
        "Japanese dictionary & JLPT learning platform with bilingual (Vietnamese/English) meanings, SM-2 spaced repetition flashcards, and animated kanji stroke orders.",
      tech: ["Next.js", "TypeScript", "Convex", "Tailwind CSS"],
      url: "https://vjisho.vercel.app",
      repo: "https://github.com/IamBread2007/VJisho",
    },
    {
      name: "My portfolio",
      description:
        "My personal profile website with real-time Discord/Spotify presence, background music streaming, and interactive neko companion.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "DaisyUI", "WebSocket"],
      url: "https://iambread.id.vn",
      repo: "https://github.com/IamBread2007/Profile",
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
  username?: string;
};

export type Project = {
  name: string;
  description: string;
  tech?: readonly string[];
  url?: string;
  repo?: string;
};
