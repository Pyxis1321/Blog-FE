import {
	Box,
	Button,
	CircularProgress,
	Modal,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { useDashboardAllPostsQuery } from "../../API/Dashboard/useDashboardAllPostsQuery";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../Shared/Routing/Routing";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TranslationResources } from "../../Translations/EnglishTranslation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { PostFormComponent } from "../Auth/Components/PostFormComponent";
import { ConfirmationDialog } from "../../Shared/Components/ConfirmationDialog";

const Translations = TranslationResources;

export const sanitizeHtml = (html: string): string => {
	if (!html) return "";
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	return doc.body.textContent || "";
};

export const Dashboard: React.FunctionComponent = (_) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();

	const [modal, setModal] = useState(false);
	const [dialog, setDialog] = useState(false);
	const [dirty, setDirty] = useState(false);

	const { data, isFetching } = useDashboardAllPostsQuery();

	const handleClick = (postId: number) => {
		navigate(Routing.Post.path(postId));
	};

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

	return (
		<Stack>
			{isFetching && (
				<Stack alignItems="center" pt={8}>
					<CircularProgress />
				</Stack>
			)}
			{!isFetching && (
				<Stack pt={5} pr={5} alignItems="end">
					<Button
						startIcon={<AddCircleOutlineIcon />}
						onClick={() => setModal(true)}
					>
						{t(Translations.Dashboard.addPost)}
					</Button>
				</Stack>
			)}
			<Stack pt={5} gap={4} px={5} direction="row" flexWrap="wrap">
				{data?.map((post) => (
					<Stack
						key={post.id}
						bgcolor={theme.palette.grey[50]}
						borderRadius={2}
						width={200}
						height={200}
						sx={{ cursor: "pointer", flexShrink: 0, flexGrow: 0 }}
						onClick={() => handleClick(post.id)}
					>
						{post.imageUrl && (
							<Box
								component="img"
								src={post.imageUrl ?? ""}
								alt="default"
								sx={{
									width: "100%",
									height: "120px",
									objectFit: "contain",
									borderTopLeftRadius: 8,
									borderTopRightRadius: 8,
								}}
							/>
						)}
						<Stack p={1}>
							<Typography variant="h2">{post.title}</Typography>
							<Typography variant="subtitle1" color={theme.palette.grey[300]}>
								{post.user.username}
							</Typography>
							<Stack>
								<Typography
									variant="body1"
									sx={{
										display: "-webkit-box",
										overflow: "hidden",
										textOverflow: "ellipsis",
										WebkitLineClamp: 2,
										WebkitBoxOrient: "vertical",
									}}
								>
									{sanitizeHtml(post.body ?? "")}
								</Typography>
							</Stack>
						</Stack>
					</Stack>
				))}
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
