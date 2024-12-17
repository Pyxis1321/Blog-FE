import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./keys";
import { processResponse } from "../Utils";
import { getApiPosts } from "../../Shared/Api";

export function useDashboardAllPostsQuery() {
  return useQuery({
    queryKey: dashboardKeys.posts(),
    queryFn: processResponse(() => getApiPosts()),
  });
}
