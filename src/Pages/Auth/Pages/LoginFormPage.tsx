import { Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../Shared/Components/Form/FormInput";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../Shared/Routing/Routing";
import { useLoginMutation } from "../../../API/Auth/useLoginMutation";
import { useEffect } from "react";
import { setupClient } from "../../../Shared/Api";
import { useAtomValue } from "jotai";
import { sessionState } from "../../../Shared/State/SessionAtom";
import { Logo } from "../../../Shared/SVGs/Logo";
import { useColorScheme } from "../../../Shared/Theme/ColorSchemeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { toast } from "react-toastify";

const PageResources = TranslationResources;

export const LoginForm: React.FunctionComponent = (_) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const sessionAtom = useAtomValue(sessionState);
	const { mode, setMode } = useColorScheme();

	const { mutate } = useLoginMutation();

	if (sessionAtom.authenticated) {
		navigate(Routing.Dashboard.path());
	}

	const LoginFormModelSchema = z.object({
		login: z.string({
			required_error: t(PageResources.Auth.Form.required),
		}),
		password: z.string({
			required_error: t(PageResources.Auth.Form.required),
		}),
	});

	type LoginFormModel = z.infer<typeof LoginFormModelSchema>;

	const form = useForm<LoginFormModel>({
		resolver: zodResolver(LoginFormModelSchema),
	});

	const { control, handleSubmit } = form;

	const submit = (data: LoginFormModel) => {
		mutate(
			{ username: data.login, password: data.password },
			{
				onError: () => {
					toast.error(t(PageResources.Auth.Form.Validation.unauthorized));
				},
			},
		);
	};

	useEffect(() => {
		setupClient({ apiUrl: import.meta.env.VITE_API_URL, jwtKey: "" });
	});
	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			height="100vh"
			width="100%"
		>
			<Stack
				gap={3}
				bgcolor={(t) => t.palette.grey[50]}
				width="500px"
				p={3}
				borderRadius={3}
				alignItems="stretch"
			>
				<Stack alignItems="center">
					<Logo color={theme.palette.primary.main} />
					<Typography variant="h1">{t(PageResources.Auth.website)}</Typography>
				</Stack>

				<Stack alignItems="center">
					<Typography variant="h5">
						{t(PageResources.Auth.loginTitle)}
					</Typography>
				</Stack>
				<form onSubmit={handleSubmit(submit)}>
					<Stack>
						<FormInput
							control={control}
							name="login"
							placeholder={t(PageResources.Auth.username)}
							fullWidth
							sx={{
								"& .MuiOutlinedInput-notchedOutline": {
									borderRadius: "4px 4px 0 0",
								},
							}}
						/>
						<FormInput
							control={control}
							name="password"
							type="password"
							placeholder={t(PageResources.Auth.password)}
							fullWidth
							sx={{
								"& .MuiOutlinedInput-notchedOutline": {
									borderRadius: "0 0 4px 4px",
								},
							}}
						/>

						<Stack pt={3}>
							<Button
								type="submit"
								fullWidth
								color="primary"
								variant="contained"
							>
								{t(PageResources.Auth.login)}
							</Button>
						</Stack>
					</Stack>
				</form>
				<Stack justifyContent={"center"} direction="row" gap={0.3}>
					<Typography variant="body1" color={theme.palette.grey[500]}>
						{t(PageResources.Auth.registrationQuestion)}
					</Typography>
					<Typography
						variant="body1"
						style={{ color: theme.palette.primary.main, cursor: "pointer" }}
						onClick={() => navigate(Routing.Register.path())}
					>
						{t(PageResources.Auth.registrationText)}
					</Typography>
				</Stack>
			</Stack>

			<Stack position="absolute" top={20} right={20}>
				<IconButton
					sx={{
						border: (t) => `1px solid ${t.palette.grey[100]}`,
						borderRadius: 2,
					}}
					onClick={() => setMode(mode === "dark" ? "light" : "dark")}
				>
					{mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
				</IconButton>
			</Stack>
		</Stack>
	);
};
