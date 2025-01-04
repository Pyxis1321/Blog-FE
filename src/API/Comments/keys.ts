export const commentKeys = {
  all: ["commentKeys"] as const,
  comments: () => [...commentKeys.all, "comments"] as const,
};
