import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./keys";
import { processResponse, type QueryBasicOptions } from "../Utils";
import { getApiPosts } from "../../Shared/Api";
import { useAtomValue } from "jotai";
import { sessionState } from "../../Shared/State/SessionAtom";

export function useDashboardAllPostsQuery(options?: QueryBasicOptions) {
  const sessionAtom = useAtomValue(sessionState);
  return useQuery({
    queryKey: dashboardKeys.posts(),
    queryFn: processResponse(() => getApiPosts()),
    enabled: !!sessionAtom.accessToken && sessionAtom.accessToken !== "",
    ...options,
  });
}
