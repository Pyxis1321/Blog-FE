import { useMutation } from "@tanstack/react-query";
import { processResponse } from "../../Utils";
import { type CreatePostDTO, postApiPosts } from "../../../Shared/Api";

export function useUploadPostMutation() {
  return useMutation({
    mutationFn: processResponse((post: CreatePostDTO) => postApiPosts(post)),
  });
}
