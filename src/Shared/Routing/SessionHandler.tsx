import { useAtomValue } from "jotai";
import { sessionState } from "../State/SessionAtom";
import { Navigate } from "react-router-dom";
import { Routing } from "./Routing";
import { Box } from "@mui/material";
import { useRefreshMutation } from "../../API/Auth/useRefreshMutation";
import { useEffect } from "react";
type Props = {};

export const SessionHandler: React.FC<React.PropsWithChildren<Props>> = ({
	children,
}) => {
	const sessionAtom = useAtomValue(sessionState);

	const { mutate } = useRefreshMutation();

	const isAuthenticated = sessionAtom.authenticated;

	useEffect(() => {
		if (!isAuthenticated) return;

		let intervalId: number | null = null;

		const initialDelay = setTimeout(() => {
			mutate();

			intervalId = setInterval(() => {
				mutate();
			}, 50000);
		}, 1000);

		return () => {
			clearTimeout(initialDelay);
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [isAuthenticated, mutate]);

	if (!sessionAtom.authenticated) {
		return <Navigate to={Routing.Login.path()} replace />;
	}

	return <Box>{children}</Box>;
};
