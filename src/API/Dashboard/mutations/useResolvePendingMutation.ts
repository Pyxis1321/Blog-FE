import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processResponse } from "../../Utils";
import {
  type ModeratePostDTO,
  putApiPostsIdModerate,
} from "../../../Shared/Api";
import { dashboardKeys } from "../keys";

type Props = {
  requestContract: ModeratePostDTO;
  id: number;
};

export function useResolvePendingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: processResponse(({ requestContract, id }: Props) =>
      putApiPostsIdModerate(requestContract, id)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.posts() });
    },
  });
}
