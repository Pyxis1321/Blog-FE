import {
	Box,
	CircularProgress,
	Stack,
	Tab,
	Tabs,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { useDashboardPostQuery } from "../../../API/Dashboard/useDashboardAllPostsQuery";
import { PostStatus } from "../../../Shared/Api";
import { PostCardHorizontal } from "./PostCardHorizontal";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../Shared/Routing/Routing";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export const AdministrationComponent: React.FC = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [value, setValue] = useState(0);

	const [status, setStatus] = useState<PostStatus>(PostStatus.Pending);

	const { data, isFetching } = useDashboardPostQuery(status);

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleClick = (postId: number) => {
		navigate(Routing.Post.path(postId));
	};

	const defaultBg = theme.palette.grey[100];
	const selectedBg = theme.palette.common.white;
	return (
		<Stack>
			<Box sx={{ display: "flex" }} pb={2}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="custom tabs example"
					TabIndicatorProps={{ style: { display: "none" } }}
					sx={{
						width: "fit-content",
						backgroundColor: theme.palette.grey[100],
						p: 0.5,
						borderRadius: 1,
						"& .MuiTabs-flexContainer": {
							gap: 1,
						},
					}}
				>
					<Tab
						label={t(
							TranslationResources.Dashboard.Tabs.Administration.Tabs.pending,
						)}
						{...a11yProps(0)}
						iconPosition="start"
						icon={<WarningAmberIcon />}
						sx={{
							backgroundColor: value === 0 ? selectedBg : defaultBg,
							borderRadius: 1,
							minHeight: "40px",
						}}
						onClick={() => setStatus(PostStatus.Pending)}
					/>
					<Tab
						label={t(
							TranslationResources.Dashboard.Tabs.Administration.Tabs.approved,
						)}
						{...a11yProps(1)}
						iconPosition="start"
						icon={<DoneIcon />}
						sx={{
							backgroundColor: value === 1 ? selectedBg : defaultBg,
							borderRadius: 1,
							minHeight: "40px",
						}}
						onClick={() => setStatus(PostStatus.Published)}
					/>
					<Tab
						label={t(
							TranslationResources.Dashboard.Tabs.Administration.Tabs.rejected,
						)}
						{...a11yProps(2)}
						iconPosition="start"
						icon={<CloseIcon />}
						sx={{
							backgroundColor: value === 2 ? selectedBg : defaultBg,
							borderRadius: 1,
							minHeight: "40px",
						}}
						onClick={() => setStatus(PostStatus.Rejected)}
					/>
				</Tabs>
			</Box>
			<Stack>
				{isFetching ? (
					<CircularProgress />
				) : (
					<Stack>
						<CustomTabPanel value={value} index={0}>
							{data?.map((post) => (
								<PostCardHorizontal
									key={post.id}
									post={post}
									stateTag
									onClick={() => handleClick(post.id)}
								/>
							))}
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<Stack gap={2}>
								{data?.map((post) => (
									<PostCardHorizontal
										key={post.id}
										post={post}
										stateTag
										onClick={() => handleClick(post.id)}
									/>
								))}
							</Stack>
						</CustomTabPanel>
						<CustomTabPanel value={value} index={2}>
							{data?.map((post) => (
								<PostCardHorizontal
									key={post.id}
									post={post}
									stateTag
									onClick={() => handleClick(post.id)}
								/>
							))}
						</CustomTabPanel>
					</Stack>
				)}
			</Stack>
		</Stack>
	);
};
