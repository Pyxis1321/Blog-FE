import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putApiNotificationsIdRead } from "../../Shared/Api";
import { processResponse } from "../Utils";
import { notificationKeys } from "./keys";

export function useReadNotificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: processResponse((id: number) => putApiNotificationsIdRead(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.notifications(),
      });
    },
  });
}
