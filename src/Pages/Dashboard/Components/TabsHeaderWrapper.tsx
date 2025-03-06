import { Badge, IconButton, Stack, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorScheme } from "../../../Shared/Theme/ColorSchemeProvider";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useNotificationsQuery } from "../../../API/Notifications/useNotificationsQuery";

type Props = {
	title: string;
	setModal: (value: boolean) => void;
};

export const TabsHeaderWrapper = ({
	title,
	setModal,
	children,
}: React.PropsWithChildren<Props>) => {
	const { mode, setMode } = useColorScheme();
	const { data: notifications } = useNotificationsQuery();

	return (
		<Stack>
			<Stack justifyContent="space-between" direction="row">
				<Typography variant="h4">{title}</Typography>
				<Stack direction={"row"} gap={1}>
					<Badge
						badgeContent={notifications?.filter((n) => !n.isRead).length}
						color="primary"
					>
						<IconButton
							sx={{
								border: (t) => `1px solid ${t.palette.grey[100]}`,
								borderRadius: 2,
							}}
							onClick={() => setModal(true)}
						>
							<NotificationsNoneOutlinedIcon />
						</IconButton>
					</Badge>
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
			<Stack pt={4}>{children}</Stack>
		</Stack>
	);
};
