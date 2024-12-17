import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./keys";
import { processResponse, type QueryBasicOptions } from "../Utils";
import { getApiPosts } from "../../Shared/Api";

export function useDashboardAllPostsQuery(options?: QueryBasicOptions) {
  return useQuery({
    queryKey: dashboardKeys.posts(),
    queryFn: processResponse(() => getApiPosts()),
    ...options,
  });
}
