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
    playlistUrl:
      "https://open.spotify.com/playlist/6LoGePs8eyr10O8kX20Ubh?si=sgJ0bCW1StqwBzGK2KV2mg",
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
        title: "Building my Portfolio & Discord Live Presence",
        date: "2026-08-20",
        summary:
          "A look into how this site was built with Next.js, Tailwind, DaisyUI, and real-time Spotify/Discord status integration via Lanyard API.",
        url: "https://iambread.id.vn",
      },
      {
        title: "Building VJisho — Japanese & JLPT Learning Platform",
        date: "2026-08-04",
        summary:
          "How I built a full-stack Japanese dictionary with Vietnamese/English meanings, SM-2 flashcard reviews, JLPT practice, and kanji stroke order using a Next.js frontend and a Java Spring Boot backend.",
        url: "https://vjisho.tech",
      },
      {
        title: "HCMUT Admission Score Calculator (-calculus)",
        date: "2026-02-28",
        summary:
          "Building a web tool to calculate and simulate comprehensive admission scores for Ho Chi Minh City University of Technology (HCMUT).",
        url: "https://iambread2007.github.io/-calculus/",
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
        "Japanese dictionary & JLPT learning platform in Vietnamese or English: word and kanji lookup with readings and stroke order, SM-2 spaced-repetition flashcards, quizzes, JLPT practice tests, and personal notes tied to your Google account.",
      tech: ["Next.js", "TypeScript", "Java", "Spring Boot", "MySQL", "Redis"],
      url: "https://vjisho.tech",
    },
    {
      name: "VTranslator",
      description:
        "Chrome extension + local server that translates Japanese, Korean, and Chinese manga/webtoons into Vietnamese right on the reading page: detects speech bubbles, OCRs and translates the text with AI, erases the original, and re-typesets it with a Rust/WebAssembly layout engine.",
      tech: ["TypeScript", "Python", "Rust", "WebAssembly", "Chrome Extension"],
    },
    {
      name: "HCMUT Score Calculator",
      description:
        "Web tool to calculate and simulate admission scores for Ho Chi Minh City University of Technology (HCMUT / ĐHQG-HCM).",
      tech: ["JavaScript", "HTML", "CSS"],
      url: "https://iambread2007.github.io/-calculus/",
      repo: "https://github.com/IamBread2007/-calculus",
    },
    {
      name: "My portfolio",
      description:
        "This site: retro terminal boot animation, real-time Discord/Spotify presence via Lanyard, a floating Spotify player, and selectable oneko companions.",
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
