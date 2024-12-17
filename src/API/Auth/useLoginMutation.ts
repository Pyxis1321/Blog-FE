import { useMutation } from "@tanstack/react-query";
import {
  type LoginDTO,
  type LoginModel,
  postApiAuthLogin,
  setupClient,
} from "../../Shared/Api";
import { processResponse } from "../Utils";
import { sessionState } from "../../Shared/State/SessionAtom";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../Shared/Routing/Routing";

export function useLoginMutation() {
  const navigate = useNavigate();
  const setSessionState = useSetAtom(sessionState);
  return useMutation<LoginDTO, Error, LoginModel>({
    mutationFn: processResponse((requestContract: LoginModel) =>
      postApiAuthLogin(requestContract)
    ),
    onSuccess: (data: LoginDTO) => {
      console.log("sucess");
      setSessionState({
        accessToken: data.token ?? "",
        refreshToken: data.refreshToken ?? "1",
        authenticated: true,
      });
      navigate(Routing.Dashboard.path());
      setupClient({
        apiUrl: "https://localhost:7167",
        jwtKey: data.token ?? "",
      });
    },
  });
}
