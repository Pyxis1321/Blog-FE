import { Button, Stack, Typography, useTheme } from "@mui/material";
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

const PageResources = TranslationResources;

export const LoginForm: React.FunctionComponent = (_) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const sessionAtom = useAtomValue(sessionState);

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
		mutate({ username: data.login, password: data.password });
	};

	useEffect(() => {
		setupClient({ apiUrl: import.meta.env.VITE_API_URL, jwtKey: "" });
	});
	return (
		<Stack alignItems="center" justifyContent="center" height="100vh">
			<form onSubmit={handleSubmit(submit)}>
				<Stack gap={2}>
					<FormInput
						control={control}
						name="login"
						label={t(PageResources.Auth.username)}
					/>
					<FormInput
						control={control}
						name="password"
						type="password"
						label={t(PageResources.Auth.password)}
					/>
					<Typography
						color={theme.palette.primary.main}
						onClick={() => navigate(Routing.Register.path())}
					>
						{t(PageResources.Auth.registration)}
					</Typography>
					<Button type="submit" fullWidth color="primary" variant="contained">
						Submit
					</Button>
				</Stack>
			</form>
		</Stack>
	);
};
