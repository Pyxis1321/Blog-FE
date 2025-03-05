import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./keys";
import { processResponse, type QueryBasicOptions } from "../Utils";
import { getApiPosts, type PostStatus } from "../../Shared/Api";
import { useAtomValue } from "jotai";
import { sessionState } from "../../Shared/State/SessionAtom";

export function useDashboardPostQuery(
  status?: PostStatus,
  options?: QueryBasicOptions
) {
  const sessionAtom = useAtomValue(sessionState);
  return useQuery({
    queryKey: dashboardKeys.posts(status),
    queryFn: processResponse(() => getApiPosts(status)),
    enabled: !!sessionAtom.accessToken && sessionAtom.accessToken !== "",
    ...options,
  });
}
