import { useQuery } from "@tanstack/react-query";
import { processResponse, type QueryBasicOptions } from "../Utils";
import { analyticsKeys } from "./keys";
import { fetchTopPostsByClicksUsingQuery } from "./getAnalytics";
import type { TopPost } from "./getAnalytics";

const payload = {
  query: {
    kind: "HogQLQuery",
    query: `
      SELECT 
        JSONExtractString(properties, 'post_id') AS postId, 
        COUNT(*) AS count 
      FROM events 
      WHERE event = 'post_clicked'
        AND JSONExtractString(properties, 'post_id') <> ''
      GROUP BY postId
      ORDER BY count DESC
      LIMIT 3
    `,
  },
};

export function useGetTrendingPosts(options?: QueryBasicOptions) {
  return useQuery<TopPost[]>({
    queryKey: analyticsKeys.trending(),
    queryFn: processResponse(() => fetchTopPostsByClicksUsingQuery(payload)),
    staleTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
    ...options,
  });
}
