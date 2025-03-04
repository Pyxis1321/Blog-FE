export const analyticsKeys = {
  all: ["analytics"] as const,
  trending: () => [...analyticsKeys.all, "trending"] as const,
  personalized: () => [...analyticsKeys.all, "personalized"] as const,
};
