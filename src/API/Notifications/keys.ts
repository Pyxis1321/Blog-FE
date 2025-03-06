export const notificationKeys = {
  all: ["natifications"] as const,
  notifications: () => [...notificationKeys.all, "notifications"] as const,
};
