import type { PostStatus } from "../../Shared/Api";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  posts: (status?: PostStatus) =>
    [...dashboardKeys.all, "posts", status] as const,
  filterPosts: (id: number) =>
    [...dashboardKeys.all, "filterPosts", id] as const,
};
