import {
	Box,
	ButtonBase,
	IconButton,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { TranslationResources } from "../../Translations/EnglishTranslation";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useNotificationsQuery } from "../../API/Notifications/useNotificationsQuery";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useReadNotificationMutation } from "../../API/Notifications/useReadNotificationMutation";
import type { NotificationDTO } from "../../Shared/Api";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../Shared/Routing/Routing";
import { useReadAllNotificationMutation } from "../../API/Notifications/useReadAllNotificationMutation";

export const timeAgo = (dateString: string): string => {
	const date = parseISO(dateString);
	return formatDistanceToNow(date, { addSuffix: true });
};

type Props = {
	onClose: (close: boolean) => void;
};

export const NotificationModal: React.FunctionComponent<Props> = ({
	onClose,
}) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();

	const { data: notifications } = useNotificationsQuery();
	const { mutate: readNotification } = useReadNotificationMutation();
	const { mutate: readAllNotification } = useReadAllNotificationMutation();

	const handleNotificationRead = (notification: NotificationDTO) => {
		if (!notification.isRead) readNotification(notification.id);
		if (notification.postId) navigate(Routing.Post.path(notification.postId));
	};

	return (
		<Stack
			bgcolor={theme.palette.common.white}
			p={2}
			sx={{ border: `1px solid ${theme.palette.grey[100]}` }}
			borderRadius={2}
		>
			<Stack alignItems="flex-end">
				<IconButton>
					<CloseOutlinedIcon onClick={() => onClose(false)} />
				</IconButton>
			</Stack>
			<Stack
				direction={"row"}
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<Typography fontSize={18} fontWeight={600}>
					{t("Notifications.title")}
				</Typography>
				<Typography
					variant="body2"
					sx={{ cursor: "pointer" }}
					onClick={readAllNotification}
				>
					{t(TranslationResources.Notifications.read)}
				</Typography>
			</Stack>
			<Stack pt={2} gap={1}>
				{notifications?.map((notification) => (
					<ButtonBase
						key={notification.id}
						sx={{
							borderRadius: 2,
							textAlign: "left",
							backgroundColor: notification.isRead
								? undefined
								: theme.palette.grey[100],
						}}
						onClick={() => handleNotificationRead(notification)}
					>
						<Stack alignItems="flex-start" gap={1} p={1}>
							<Stack direction={"row"} justifyContent={"space-between"}>
								<Stack flexGrow={1}>
									<Typography fontSize={14} fontWeight={500}>
										{notification.message}
									</Typography>
								</Stack>
								{!notification.isRead && (
									<Stack display="flex" pl={0.2}>
										<Box
											sx={{
												width: 8,
												height: 8,
												borderRadius: "50%",
												bgcolor: "primary.main",
											}}
										/>
									</Stack>
								)}
							</Stack>
							<Stack>
								<Typography variant="body1" color={theme.palette.grey[500]}>
									{timeAgo(notification.createdAt)}
								</Typography>
							</Stack>
						</Stack>
					</ButtonBase>
				))}
			</Stack>
		</Stack>
	);
};
