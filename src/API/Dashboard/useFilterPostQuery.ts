import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./keys";
import { processResponse, type QueryBasicOptions } from "../Utils";
import { getApiPostsId } from "../../Shared/Api";

export function useFilterPostQuery(id: number, options?: QueryBasicOptions) {
  return useQuery({
    queryKey: dashboardKeys.filterPosts(id),
    queryFn: processResponse(() => getApiPostsId(id)),
    ...options,
  });
}
