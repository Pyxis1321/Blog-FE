import { useState, useEffect } from "react";
import {
	Button,
	IconButton,
	Stack,
	Typography,
	useTheme,
	InputAdornment,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../Shared/Components/Form/FormInput";
import { useRegiterMutation } from "../../../API/Auth/useRegisterMutation";
import { setupClient } from "../../../Shared/Api";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorScheme } from "../../../Shared/Theme/ColorSchemeProvider";
import { Logo } from "../../../Shared/SVGs/Logo";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../Shared/Routing/Routing";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { createRegisterFormModelSchema } from "../Helpers/RegisterFormModelSchema";
import type { z } from "zod";

const PageResources = TranslationResources;

export const RegisterForm: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();
	const { mode, setMode } = useColorScheme();

	const { mutate } = useRegiterMutation();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const RegisterFormModelSchema = createRegisterFormModelSchema(t);
	type RegisterFormModel = z.infer<typeof RegisterFormModelSchema>;

	const form = useForm<RegisterFormModel>({
		resolver: zodResolver(RegisterFormModelSchema),
	});

	const { control, handleSubmit } = form;

	const submit = (data: RegisterFormModel) => {
		mutate(
			{
				username: data.login,
				email: data.email,
				password: data.password,
			},
			{
				onSuccess: () => {
					navigate(Routing.Login.path());
				},
			},
		);
	};

	useEffect(() => {
		setupClient({ apiUrl: import.meta.env.VITE_API_URL, jwtKey: "" });
	}, []);

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
						{t(PageResources.Auth.registerTitle)}
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
							name="email"
							placeholder={t(PageResources.Auth.email)}
							fullWidth
							sx={{
								"& .MuiOutlinedInput-notchedOutline": {
									borderRadius: "0",
								},
							}}
						/>

						<FormInput
							control={control}
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder={t(PageResources.Auth.password)}
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onMouseDown={() => setShowPassword(true)}
											onMouseUp={() => setShowPassword(false)}
											onMouseLeave={() => setShowPassword(false)}
											onTouchStart={() => setShowPassword(true)}
											onTouchEnd={() => setShowPassword(false)}
										>
											{showPassword ? (
												<VisibilityOffIcon />
											) : (
												<VisibilityIcon />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-notchedOutline": {
									borderRadius: "0",
								},
							}}
						/>

						<FormInput
							control={control}
							name="confirmPassword"
							type={showConfirmPassword ? "text" : "password"}
							placeholder={t(PageResources.Auth.confirmPassword)}
							fullWidth
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onMouseDown={() => setShowConfirmPassword(true)}
											onMouseUp={() => setShowConfirmPassword(false)}
											onMouseLeave={() => setShowConfirmPassword(false)}
											onTouchStart={() => setShowConfirmPassword(true)}
											onTouchEnd={() => setShowConfirmPassword(false)}
										>
											{showConfirmPassword ? (
												<VisibilityOffIcon />
											) : (
												<VisibilityIcon />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
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
								{t(PageResources.Auth.register)}
							</Button>
						</Stack>
					</Stack>
				</form>
				<Stack justifyContent={"center"} direction="row" gap={0.3}>
					<Typography variant="body1" color={theme.palette.grey[500]}>
						{t(PageResources.Auth.loginQuestion)}
					</Typography>
					<Typography
						variant="body1"
						style={{
							color: theme.palette.primary.main,
							cursor: "pointer",
						}}
						onClick={() => navigate(Routing.Login.path())}
					>
						{t(PageResources.Auth.loginText)}
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
