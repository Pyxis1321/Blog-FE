import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processResponse } from "../Utils";
import { type CreateCommentDTO, postApiComments } from "../../Shared/Api";
import { commentKeys } from "./keys";

export function useUploadCommentMutation() {
  const queryClent = useQueryClient();
  return useMutation({
    mutationFn: processResponse((requestContract: CreateCommentDTO) =>
      postApiComments(requestContract)
    ),
    onSuccess: () => {
      queryClent.invalidateQueries({ queryKey: commentKeys.comments() });
    },
  });
}
