import { atomWithStorage } from "jotai/utils";

export type SessionState = {
  authenticated: boolean;
  accessToken: string;
  refreshToken: string;
  isAdmin: boolean;
};

const defaultState: SessionState = {
  authenticated: false,
  accessToken: "",
  refreshToken: "",
  isAdmin: false,
};

export const sessionState = atomWithStorage<SessionState>(
  "SESSION_STATE",
  defaultState
);
