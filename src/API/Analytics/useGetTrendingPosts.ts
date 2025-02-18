import { useQuery } from "@tanstack/react-query";
import { processResponse, type QueryBasicOptions } from "../Utils";
import { analyticsKeys } from "./keys";
import { fetchTopPostsByClicksUsingQuery } from "./getAnalytics";
import type { TopPost } from "./getAnalytics";

export function useGetTrendingPosts(options?: QueryBasicOptions) {
  return useQuery<TopPost[]>({
    queryKey: analyticsKeys.trending(),
    queryFn: processResponse(() => fetchTopPostsByClicksUsingQuery()),
    staleTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
    ...options,
  });
}
