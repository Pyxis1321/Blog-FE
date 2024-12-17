import { useMutation } from "@tanstack/react-query";
import { postApiAuthRegister, type RegisterModel } from "../../Shared/Api";

export function useRegiterMutation() {
  return useMutation({
    mutationFn: (requestContract: RegisterModel) =>
      postApiAuthRegister(requestContract),
  });
}
