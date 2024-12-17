export const dashboardKeys = {
  all: ["dashboard"] as const,
  posts: () => [...dashboardKeys.all, "posts"] as const,
};
