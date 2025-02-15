import { useMutation } from "@tanstack/react-query";
import {
  type Configuration,
  type LoginDTO,
  postApiAuthRefreshToken,
  setupClient,
} from "../../Shared/Api";
import { processResponse } from "../Utils";
import { useAtom } from "jotai";
import { sessionState } from "../../Shared/State/SessionAtom";

export function useRefreshMutation() {
  const [sessionStateAtom, setSessionState] = useAtom(sessionState);
  return useMutation<LoginDTO, Error, void>({
    mutationFn: processResponse(() =>
      postApiAuthRefreshToken({
        accessToken: sessionStateAtom.accessToken,
        refreshToken: sessionStateAtom.refreshToken,
      })
    ),
    onSuccess: (data: LoginDTO) => {
      setSessionState((prev) => ({
        ...prev,
        accessToken: data.token ?? "",
        refreshToken: data.refreshToken ?? "",
      }));
      const client: Configuration = {
        apiUrl: import.meta.env.VITE_API_URL,
        jwtKey: () => {
          return `bearer ${data.token}`;
        },
      };

      setupClient(client);
    },
    onError: () => {
      setSessionState({
        accessToken: "",
        refreshToken: "",
        authenticated: false,
        isAdmin: false,
      });
    },
  });
}
