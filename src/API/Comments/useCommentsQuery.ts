import { useQuery } from "@tanstack/react-query";
import { commentKeys } from "./keys";
import { processResponse, type QueryBasicOptions } from "../Utils";
import { getApiCommentsPostPostId } from "../../Shared/Api";

export function useCommentsQuery(postId: number, options?: QueryBasicOptions) {
  return useQuery({
    queryKey: commentKeys.comments(),
    queryFn: processResponse(() => getApiCommentsPostPostId(postId)),
    ...options,
  });
}
