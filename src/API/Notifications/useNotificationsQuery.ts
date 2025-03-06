import { useQuery } from "@tanstack/react-query";
import { notificationKeys } from "./keys";
import { processResponse } from "../Utils";
import { getApiNotifications } from "../../Shared/Api";
export function useNotificationsQuery() {
  return useQuery({
    queryKey: notificationKeys.notifications(),
    queryFn: processResponse(() => getApiNotifications()),
    refetchInterval: 5 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
}
