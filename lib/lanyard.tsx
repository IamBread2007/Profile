"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/lib/config";

export type Spotify = {
  track_id?: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: { start?: number; end?: number };
};

export type Activity = {
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: { start?: number; end?: number };
};

export type Presence = {
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities?: Activity[];
  listening_to_spotify?: boolean;
  spotify?: Spotify | null;
};

type LanyardState = {
  presence: Presence | null;
  connected: boolean;
};

const LanyardContext = createContext<LanyardState>({
  presence: null,
  connected: false,
});

const WS_URL = "wss://api.lanyard.rest/socket";

type SocketMessage =
  | { op: 1; d: { heartbeat_interval: number } }
  | { op: 0; t: string; d: unknown };

export function LanyardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LanyardState>({
    presence: null,
    connected: false,
  });
  const heartbeat = useRef<ReturnType<typeof setInterval> | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const userId = site.discordUserId;
    if (!userId) return;

    let closed = false;

    function connect() {
      if (closed) return;
      try {
        const ws = new WebSocket(WS_URL);
        socketRef.current = ws;

        ws.onopen = () => setState((s) => ({ ...s, connected: true }));

        ws.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data as string) as SocketMessage;
            if (msg.op === 1) {
              const { heartbeat_interval } = msg.d;
              ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
              if (heartbeat.current) clearInterval(heartbeat.current);
              heartbeat.current = setInterval(
                () => ws.readyState === WebSocket.OPEN && ws.send(JSON.stringify({ op: 3 })),
                heartbeat_interval,
              );
            } else if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")) {
              setState({ presence: msg.d as Presence, connected: true });
            }
          } catch {}
        };

        ws.onclose = () => {
          setState((s) => ({ ...s, connected: false }));
          if (heartbeat.current) clearInterval(heartbeat.current);
          if (!closed) setTimeout(connect, 3000);
        };

        ws.onerror = () => {
          ws.close();
        };
      } catch {}
    }

    connect();

    return () => {
      closed = true;
      if (heartbeat.current) clearInterval(heartbeat.current);
      socketRef.current?.close();
    };
  }, []);

  return <LanyardContext.Provider value={state}>{children}</LanyardContext.Provider>;
}

export function useLanyard() {
  return useContext(LanyardContext);
}

const CODE_EDITORS = [
  "visual studio code",
  "vs code",
  "vscode",
  "code",
  "cursor",
  "neovim",
  "intellij idea",
  "webstorm",
];

function findEditorActivity(activities?: Activity[]): Activity | undefined {
  if (!activities || !Array.isArray(activities)) return undefined;
  return activities.find(
    (a) => a && a.type === 0 && a.name && CODE_EDITORS.includes(a.name.toLowerCase()),
  );
}

export function useStatuses() {
  const { presence, connected } = useLanyard();

  const spotify =
    presence?.listening_to_spotify && presence.spotify ? presence.spotify : null;

  const activities = presence?.activities && Array.isArray(presence.activities) ? presence.activities : [];
  const editor = findEditorActivity(activities);
  const game = activities.find(
    (a) => a && a.type === 0 && a !== editor,
  );

  return {
    enabled: Boolean(site.discordUserId),
    online: connected && presence?.discord_status !== "offline",
    spotify,
    editor,
    game,
  };
}
