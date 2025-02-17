import { IconButton, Stack, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorScheme } from "../../../Shared/Theme/ColorSchemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type Props = {
	title: string;
};

export const TabsHeaderWrapper = ({
	title,
	children,
}: React.PropsWithChildren<Props>) => {
	const { mode, setMode } = useColorScheme();
	return (
		<Stack>
			<Stack justifyContent="space-between" direction="row">
				<Typography variant="h4">{title}</Typography>
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
			<Stack pt={4}>{children}</Stack>
		</Stack>
	);
};
