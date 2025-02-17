import { useMutation } from "@tanstack/react-query";
import { postApiAuthLogout } from "../../Shared/Api";
import { useSetAtom } from "jotai";
import {
  defaultSessionState,
  sessionState,
} from "../../Shared/State/SessionAtom";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../Shared/Routing/Routing";

export function useLogoutMutation() {
  const setSessionState = useSetAtom(sessionState);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => postApiAuthLogout(),
    onSuccess() {
      setSessionState(defaultSessionState);
      navigate(Routing.Login.path());
    },
  });
}
