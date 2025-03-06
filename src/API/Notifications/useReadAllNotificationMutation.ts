import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putApiNotificationsReadAll } from "../../Shared/Api";
import { processResponse } from "../Utils";
import { notificationKeys } from "./keys";

export function useReadAllNotificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: processResponse(() => putApiNotificationsReadAll()),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.notifications(),
      });
    },
  });
}
