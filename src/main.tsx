import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Shared/Routing/Router";
import { CssBaseline, ScopedCssBaseline } from "@mui/material";
import { getTheme } from "./Shared/Theme/theme";
import ColorSchemeProvider from "./Shared/Theme/ColorSchemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./Translations/i18n";
import { ToastContainer } from "react-toastify";
import { PostHogProvider } from "posthog-js/react";

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
		<QueryClientProvider client={queryClient}>
			<ColorSchemeProvider getTheme={getTheme}>
				<CssBaseline enableColorScheme />
				<ScopedCssBaseline>
					<PostHogProvider
						apiKey={import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_KEY}
						options={{
							autocapture: false,
							api_host: import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_HOST,
						}}
					>
						<RouterProvider router={router} />
					</PostHogProvider>
				</ScopedCssBaseline>
			</ColorSchemeProvider>
		</QueryClientProvider>
	</StrictMode>,
);
