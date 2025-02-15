export const authKeys = {
  all: ["auth"] as const,
  login: () => [...authKeys.all, "login"] as const,
  userInfo: () => [...authKeys.all, "userInfo"] as const,
};
