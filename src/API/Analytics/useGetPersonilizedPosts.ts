import { useQuery } from "@tanstack/react-query";
import { processResponse, type QueryBasicOptions } from "../Utils";
import { analyticsKeys } from "./keys";
import { fetchTopPostsByClicksUsingQuery } from "./getAnalytics";
import type { TopPost } from "./getAnalytics";

export function useGetPersonilizedPosts(
  userId: string,
  options?: QueryBasicOptions
) {
  const payload = {
    query: {
      kind: "HogQLQuery",
      query: `
		  	SELECT 
  			JSONExtractString(properties, 'tag') AS tag,
  			COUNT(*) AS count
			FROM events 
			WHERE event = 'post_clicked'
			AND JSONExtractString(properties, 'user_id') = '${userId}'
			AND length(JSONExtractString(properties, 'tag')) > 0
			GROUP BY tag
			ORDER BY count DESC
			LIMIT 1
			`,
    },
  };
  return useQuery<TopPost[]>({
    queryKey: analyticsKeys.personalized(),
    queryFn: processResponse(() => fetchTopPostsByClicksUsingQuery(payload)),
    staleTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
    enabled: !!userId,
    ...options,
  });
}
