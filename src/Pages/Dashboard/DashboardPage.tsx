import {
	Box,
	CircularProgress,
	Modal,
	Stack,
	Tab,
	Tabs,
	Typography,
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
	const [modal, setModal] = useState(false);
	const [dialog, setDialog] = useState(false);
	const [dirty, setDirty] = useState(false);

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
		<Stack bgcolor={(t) => t.palette.grey[50]} pt={2}>
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
					<Tabs
						orientation="vertical"
						variant="scrollable"
						value={value}
						onChange={handleChange}
					>
						<Tab
							label={t(Translations.Dashboard.Tabs.Home.tab)}
							{...a11yProps(0)}
							icon={<HomeIcon />}
							iconPosition="start"
						/>
						<Tab
							label={t(Translations.Dashboard.Tabs.Settings.title)}
							{...a11yProps(1)}
							icon={<SettingsIcon />}
							iconPosition="start"
						/>
					</Tabs>
				</Stack>

				<Stack flexGrow={1}>
					<TabPanel value={value} index={0}>
						<TabsHeaderWrapper
							title={t(Translations.Dashboard.Tabs.Home.title)}
						>
							<DashboardComponent
								setFetching={setIsFetching}
								setModal={setModal}
							/>
						</TabsHeaderWrapper>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<TabsHeaderWrapper
							title={t(Translations.Dashboard.Tabs.Settings.title)}
						>
							<SettingsComponent />
						</TabsHeaderWrapper>
					</TabPanel>
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
					<PostFormComponent setDirty={setDirty} />
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
		</Stack>
	);
};
