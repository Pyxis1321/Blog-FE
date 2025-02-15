import { useMutation } from "@tanstack/react-query";
import { processResponse } from "../../Utils";
import { deleteApiPostsId } from "../../../Shared/Api";

export function useDeletePostMutation() {
  return useMutation({
    mutationFn: processResponse((id: number) => deleteApiPostsId(id)),
  });
}
