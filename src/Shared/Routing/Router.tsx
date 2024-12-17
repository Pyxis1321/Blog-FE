import { createBrowserRouter, Navigate } from "react-router-dom";
import { Dashboard } from "../../Pages/Dashboard/DashboardPage";
import { LoginForm } from "../../Pages/Auth/Pages/LoginFormPage";
import { RegisterForm } from "../../Pages/Auth/Pages/RegisterFormPage";
import { SessionHandler } from "./SessionHandler";
import { Routing } from "./Routing";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to={Routing.Login.path()} replace />,
	},
	{
		path: Routing.Login.path(),
		element: <LoginForm />,
	},
	{
		path: Routing.Register.path(),
		element: <RegisterForm />,
	},
	{
		path: Routing.Dashboard.path(),
		element: (
			<SessionHandler>
				<Dashboard />
			</SessionHandler>
		),
	},
]);
