import { Button, Stack, Typography, useTheme } from "@mui/material";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogoutMutation } from "../../../API/Auth/useLogoutMutaion";

export const SettingsComponent: FC = () => {
	const { t } = useTranslation();
	const theme = useTheme();

	const { mutate: logout } = useLogoutMutation();

	return (
		<Stack
			borderRadius={2}
			sx={{ border: (t) => `1px solid ${t.palette.grey[200]}` }}
			p={2}
		>
			<Stack gap={2} alignItems="start">
				<Stack gap={0.4}>
					<Typography variant="h4">
						{t(TranslationResources.Dashboard.Tabs.Settings.Component.title)}
					</Typography>
					<Typography fontSize="13px" color={theme.palette.grey[500]}>
						{t(TranslationResources.Dashboard.Tabs.Settings.Component.subtitle)}
					</Typography>
				</Stack>
				<Typography variant="h3">
					{t(TranslationResources.Dashboard.Tabs.Settings.Component.content)}
				</Typography>
				<Button
					variant="contained"
					color="error"
					startIcon={<LogoutIcon />}
					onClick={() => logout()}
				>
					{t(TranslationResources.Dashboard.Tabs.Settings.Component.logout)}
				</Button>
			</Stack>
		</Stack>
	);
};
