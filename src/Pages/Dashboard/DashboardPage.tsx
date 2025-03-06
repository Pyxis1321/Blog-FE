import {
	Box,
	CircularProgress,
	Modal,
	Stack,
	Tab,
	Tabs,
	Typography,
	useTheme,
} from "@mui/material";
import { TranslationResources } from "../../Translations/EnglishTranslation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { PostFormComponent } from "../Auth/Components/PostFormComponent";
import { ConfirmationDialog } from "../../Shared/Components/ConfirmationDialog";
import { DashboardComponent } from "./Components/DashboardComponent";
import { TabsHeaderWrapper } from "./Components/TabsHeaderWrapper";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { SettingsComponent } from "./Components/SettingsComponents";
import { Logo } from "../../Shared/SVGs/Logo";
import { PostsComponent } from "./Components/PostsComponent";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useUserInfo } from "../../API/Auth/useUserInfo";
import SecurityIcon from "@mui/icons-material/Security";
import { AdministrationComponent } from "./Components/AdministrationComponent";
import { NotificationModal } from "../Notifications/NotificationModal";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box px={2}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

const Translations = TranslationResources;

export const Dashboard: React.FunctionComponent = (_) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const [modal, setModal] = useState(false);
	const [dialog, setDialog] = useState(false);
	const [notifications, setNotifications] = useState(false);
	const [dirty, setDirty] = useState(false);
	const { data: userData } = useUserInfo();

	const [isFetching, setIsFetching] = useState(false);

	const handleModalClose = () => {
		if (dirty) {
			setDialog(true);
			return;
		}
		setModal(false);
	};

	const handleDialogClose = (confirmed: boolean) => {
		if (confirmed) {
			setDirty(false);
			setModal(false);
		}
		setDialog(false);
	};

	const [value, setValue] = useState(0);

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Stack py={2}>
			{isFetching && (
				<Stack
					position="absolute"
					sx={{
						top: "20%",
						left: "50%",
						transform: "translateX(-50%)",
					}}
				>
					<CircularProgress />
				</Stack>
			)}
			<Stack direction="row">
				<Stack px={1}>
					<Stack direction={"row"} alignItems={"center"} gap={1} pb={2}>
						<Logo
							width={28}
							height={28}
							color={
								theme.palette.mode === "dark"
									? theme.palette.common.white
									: theme.palette.common.black
							}
						/>
						<Typography variant="h2" fontWeight={700}>
							{t(Translations.Auth.website)}
						</Typography>
					</Stack>
					<Tabs
						orientation="vertical"
						variant="scrollable"
						value={value}
						onChange={handleChange}
						sx={{ width: 170 }}
					>
						<Tab
							label={t(Translations.Dashboard.Tabs.Home.tab)}
							{...a11yProps(0)}
							icon={<HomeIcon />}
							iconPosition="start"
							sx={{
								minHeight: "50px",
								justifyContent: "flex-start",
							}}
						/>
						<Tab
							label={t(Translations.Dashboard.Tabs.Posts.title)}
							{...a11yProps(1)}
							icon={<MenuBookIcon />}
							iconPosition="start"
							sx={{
								minHeight: "50px",
								justifyContent: "flex-start",
							}}
						/>
						<Tab
							label={t(Translations.Dashboard.Tabs.Settings.title)}
							{...a11yProps(2)}
							icon={<SettingsIcon />}
							iconPosition="start"
							sx={{
								minHeight: "50px",
								justifyContent: "flex-start",
							}}
						/>
						{userData?.roles?.includes("Administrator") && (
							<Tab
								label={t(Translations.Dashboard.Tabs.Administration.title)}
								{...a11yProps(3)}
								icon={<SecurityIcon />}
								iconPosition="start"
								sx={{
									minHeight: "50px",
									justifyContent: "flex-start",
								}}
							/>
						)}
					</Tabs>
				</Stack>

				<Stack flexGrow={1}>
					<TabPanel value={value} index={0}>
						<TabsHeaderWrapper
							title={t(Translations.Dashboard.Tabs.Home.title)}
							setModal={setNotifications}
						>
							<DashboardComponent
								setFetching={setIsFetching}
								setModal={setModal}
							/>
						</TabsHeaderWrapper>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<TabsHeaderWrapper
							title={t(Translations.Dashboard.Tabs.Home.title)}
							setModal={setNotifications}
						>
							<PostsComponent setFetching={setIsFetching} setModal={setModal} />
						</TabsHeaderWrapper>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<TabsHeaderWrapper
							title={t(Translations.Dashboard.Tabs.Settings.title)}
							setModal={setNotifications}
						>
							<SettingsComponent />
						</TabsHeaderWrapper>
					</TabPanel>
					{userData?.roles?.includes("Administrator") && (
						<TabPanel value={value} index={3}>
							<TabsHeaderWrapper
								title={t(Translations.Dashboard.Tabs.Administration.title)}
								setModal={setNotifications}
							>
								<AdministrationComponent />
							</TabsHeaderWrapper>
						</TabPanel>
					)}
				</Stack>
			</Stack>
			<Modal
				open={modal}
				onClose={handleModalClose}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Stack width="60%">
					<PostFormComponent setDirty={setDirty} setDialogOpen={setModal} />
				</Stack>
			</Modal>
			<ConfirmationDialog
				open={dialog}
				onClose={handleDialogClose}
				title={t(Translations.Post.PostForm.dialogTitle)}
				body={t(Translations.Post.PostForm.dialogBody)}
				confirmButtonLabel={t(Translations.Post.PostForm.dialogConfirmButton)}
				cancelButtonLabel={t(Translations.Post.PostForm.dialogCancelButton)}
			/>
			<Modal open={notifications} onClose={() => setNotifications(false)}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
					width="30%"
				>
					<NotificationModal onClose={setNotifications} />
				</Box>
			</Modal>
		</Stack>
	);
};
