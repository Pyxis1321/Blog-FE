import { useQuery } from "@tanstack/react-query";
import { processResponse, type QueryBasicOptions } from "../Utils";
import { getApiUserProfile } from "../../Shared/Api";
import { authKeys } from "./authKeys";

export function useUserInfo(options?: QueryBasicOptions) {
  return useQuery({
    queryKey: authKeys.userInfo(),
    queryFn: processResponse(() => getApiUserProfile()),
    ...options,
  });
}
