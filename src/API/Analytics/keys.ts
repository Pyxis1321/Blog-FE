export const analyticsKeys = {
  all: ["analytics"] as const,
  trending: () => [...analyticsKeys.all, "trending"] as const,
};
