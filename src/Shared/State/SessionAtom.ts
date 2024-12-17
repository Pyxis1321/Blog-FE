import { atomWithStorage } from "jotai/utils";

export type SessionState = {
  authenticated: boolean;
  accessToken: string;
  refreshToken: string;
};

const defaultState: SessionState = {
  authenticated: false,
  accessToken: "",
  refreshToken: "",
};

export const sessionState = atomWithStorage<SessionState>(
  "SESSION_STATE",
  defaultState
);
