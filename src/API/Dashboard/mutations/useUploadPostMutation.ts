import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processResponse } from "../../Utils";
import { type CreatePostDTO, postApiPosts } from "../../../Shared/Api";
import { dashboardKeys } from "../keys";

export function useUploadPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: processResponse((post: CreatePostDTO) => postApiPosts(post)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.posts() });
    },
  });
}
