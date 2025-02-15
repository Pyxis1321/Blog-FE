import { useMutation } from "@tanstack/react-query";
import { processResponse } from "../../Utils";
import { type EditPostDto, putApiPostsId } from "../../../Shared/Api";

export type EditPost = {
  id: number;
  post: EditPostDto;
};

export function useEditPostMutation() {
  return useMutation({
    mutationFn: processResponse((post: EditPost) =>
      putApiPostsId(post.post, post.id)
    ),
  });
}
