export const dashboardKeys = {
  all: ["dashboard"] as const,
  posts: () => [...dashboardKeys.all, "posts"] as const,
  filterPosts: (id: number) =>
    [...dashboardKeys.all, "filterPosts", id] as const,
};
