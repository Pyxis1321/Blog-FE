import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../Shared/Components/Form/FormInput";
import { useRegiterMutation } from "../../../API/Auth/useRegisterMutation";
import { useEffect } from "react";
import { setupClient } from "../../../Shared/Api";

const PageResources = TranslationResources;

export const RegisterForm: React.FunctionComponent = (_) => {
	const theme = useTheme();
	const { t } = useTranslation();

	const { mutate } = useRegiterMutation();

	const RegisterFormModelSchema = z.object({
		login: z.string({
			required_error: t(PageResources.Auth.Form.required),
		}),
		email: z.string({
			required_error: t(PageResources.Auth.Form.required),
		}),
		password: z.string({
			required_error: t(PageResources.Auth.Form.required),
		}),
	});

	type RegisterFormModel = z.infer<typeof RegisterFormModelSchema>;

	const form = useForm<RegisterFormModel>({
		resolver: zodResolver(RegisterFormModelSchema),
	});

	const { control, handleSubmit } = form;

	const submit = (data: RegisterFormModel) => {
		console.log("data: ", data);
		mutate({
			username: data.login,
			email: data.email,
			password: data.password,
		});
	};

	useEffect(() => {
		setupClient({ apiUrl: "https://localhost:7167", jwtKey: "" });
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
						name="email"
						label={t(PageResources.Auth.password)}
					/>
					<FormInput
						control={control}
						name="password"
						type="password"
						label={t(PageResources.Auth.password)}
					/>
					<Button type="submit" fullWidth color="primary">
						Submit
					</Button>
				</Stack>
			</form>
		</Stack>
	);
};
