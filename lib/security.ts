const NEKO_SKINS = ["maia", "vaporwave", "tora", "dog", "classic"] as const;
const DEFAULT_NEKO_SKIN = "maia";
const MIN_HEARTBEAT_INTERVAL = 1_000;
const MAX_HEARTBEAT_INTERVAL = 120_000;
const MAX_ACTIVITIES = 100;

type NekoSkin = (typeof NEKO_SKINS)[number];

type PresenceActivityPayload = {
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: { start?: number; end?: number };
};

type SpotifyPayload = {
  track_id?: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: { start?: number; end?: number };
};

type PresencePayload = {
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities?: PresenceActivityPayload[];
  listening_to_spotify?: boolean;
  spotify?: SpotifyPayload | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isTimestampPayload(value: unknown): value is { start?: number; end?: number } {
  if (!isRecord(value)) return false;
  return (
    (value.start === undefined || (typeof value.start === "number" && Number.isFinite(value.start))) &&
    (value.end === undefined || (typeof value.end === "number" && Number.isFinite(value.end)))
  );
}

function isPresenceActivityPayload(value: unknown): value is PresenceActivityPayload {
  if (!isRecord(value)) return false;
  return (
    typeof value.name === "string" &&
    typeof value.type === "number" &&
    Number.isFinite(value.type) &&
    isOptionalString(value.state) &&
    isOptionalString(value.details) &&
    isOptionalString(value.application_id) &&
    (value.timestamps === undefined || isTimestampPayload(value.timestamps))
  );
}

function isSpotifyPayload(value: unknown): value is SpotifyPayload {
  if (!isRecord(value)) return false;
  return (
    typeof value.song === "string" &&
    typeof value.artist === "string" &&
    typeof value.album === "string" &&
    typeof value.album_art_url === "string" &&
    isOptionalString(value.track_id) &&
    isTimestampPayload(value.timestamps)
  );
}

export function getNekoSpriteUrl(variant?: string | null): string {
  const skin = NEKO_SKINS.includes(variant as NekoSkin) ? variant : DEFAULT_NEKO_SKIN;
  return `/images/oneko/${skin}.gif`;
}

export function getValidHeartbeatInterval(value: unknown): number | null {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < MIN_HEARTBEAT_INTERVAL ||
    value > MAX_HEARTBEAT_INTERVAL
  ) {
    return null;
  }
  return value;
}

export function isPresencePayload(value: unknown): value is PresencePayload {
  if (!isRecord(value)) return false;
  if (!["online", "idle", "dnd", "offline"].includes(String(value.discord_status))) {
    return false;
  }
  if (
    value.activities !== undefined &&
    (!Array.isArray(value.activities) ||
      value.activities.length > MAX_ACTIVITIES ||
      !value.activities.every(isPresenceActivityPayload))
  ) {
    return false;
  }
  if (value.listening_to_spotify !== undefined && typeof value.listening_to_spotify !== "boolean") {
    return false;
  }
  return value.spotify === undefined || value.spotify === null || isSpotifyPayload(value.spotify);
}
