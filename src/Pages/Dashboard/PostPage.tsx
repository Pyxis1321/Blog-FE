import { Box, Button, Modal, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterPostQuery } from "../../API/Dashboard/useFilterPostQuery";
import parse, {
	type DOMNode,
	domToReact,
	type HTMLReactParserOptions,
} from "html-react-parser";
import { CommentComponent } from "./Components/CommentComponent";
import { ConfirmationDialog } from "../../Shared/Components/ConfirmationDialog";
import { TranslationResources } from "../../Translations/EnglishTranslation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDeletePostMutation } from "../../API/Dashboard/mutations/useDeletePostMutation";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserInfo } from "../../API/Auth/useUserInfo";
import { PostFormComponent } from "../Auth/Components/PostFormComponent";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import { PostStatus } from "../../Shared/Api";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useResolvePendingMutation } from "../../API/Dashboard/mutations/useResolvePendingMutation";

const options: HTMLReactParserOptions = {
	replace: (domNode: DOMNode) => {
		if (
			domNode.type === "tag" &&
			(domNode as unknown as Element).tagName &&
			["p", "ol", "ul", "li"].includes((domNode as unknown as Element).tagName)
		) {
			const element = domNode as unknown as Element;
			return React.createElement(
				element.tagName,
				{
					style: {
						marginTop: 0,
						marginBottom: 0,
						paddingTop: 0,
						paddingBottom: 0,
					},
				},
				domToReact(element.children as unknown as DOMNode[], options),
			);
		}
	},
};

export const PostPage: React.FunctionComponent = (_) => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();

	const { data } = useFilterPostQuery(Number(id));
	const { mutate: deletePost } = useDeletePostMutation();
	const { mutate: resolvePending } = useResolvePendingMutation();

	const { data: userInfo } = useUserInfo();

	const [deleteDialog, setDeleteDialog] = useState(false);
	const [modal, setModal] = useState(false);

	const handleDeleteDialogClose = (confirmed: boolean) => {
		if (confirmed) {
			deletePost(Number(id), {
				onSuccess: () => {
					navigate(-1);
				},
			});
		}
		setDeleteDialog(false);
	};

	const handleModalClose = () => {
		setModal(false);
	};

	const handlePending = (approved: boolean) => {
		resolvePending(
			{ requestContract: { approve: approved }, id: Number(id) },
			{
				onSuccess: () => {
					navigate(-1);
				},
			},
		);
	};

	return (
		<Stack px={25} pt={5} gap={3}>
			{data?.status === PostStatus.Pending &&
				userInfo?.roles?.includes("Administrator") && (
					<Stack
						bgcolor={theme.palette.orange.main}
						p={2}
						sx={{ border: `1px solid ${theme.palette.orange.light}` }}
						borderRadius={"8px"}
						direction={"row"}
						justifyContent={"space-between"}
					>
						<Stack direction={"row"} alignItems={"center"} gap={1}>
							<Stack
								color={
									theme.palette.mode === "dark"
										? theme.palette.common.black
										: theme.palette.common.white
								}
							>
								<WarningAmberIcon color={"inherit"} />
							</Stack>
							<Typography
								variant="h3"
								color={
									theme.palette.mode === "dark"
										? theme.palette.common.black
										: theme.palette.common.white
								}
							>
								{t(TranslationResources.Post.Post.pending)}
							</Typography>
						</Stack>
						<Stack>
							<Stack
								bgcolor={theme.palette.orange.main}
								borderRadius={8}
								py={0.4}
								px={1}
								alignItems={"center"}
								alignSelf="flex-start"
								sx={{
									border: `1px solid ${
										theme.palette.mode === "dark"
											? theme.palette.common.black
											: theme.palette.common.white
									}`,
								}}
							>
								<Typography
									variant="body1"
									fontWeight={600}
									color={
										theme.palette.mode === "dark"
											? theme.palette.common.black
											: theme.palette.common.white
									}
								>
									{data.status}
								</Typography>
							</Stack>
						</Stack>
					</Stack>
				)}
			{data?.imageUrl && (
				<Stack position={"relative"}>
					<Box
						component="img"
						src={data?.imageUrl ?? ""}
						alt="default"
						width="100%"
						height={600}
						sx={{
							width: "100%",
							height: "400px",
							borderRadius: "8px",
							objectFit: "cover",
							objectPosition: "center",
						}}
					/>
					<Stack position="absolute" top={10} left={10}>
						<Stack bgcolor={theme.palette.grey[900]} borderRadius={8} p={1}>
							<Typography
								fontSize={18}
								fontWeight={600}
								color={theme.palette.common.white}
							>
								{data.tag}
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			)}
			<Stack gap={1} direction="row">
				<Stack>
					<Typography
						sx={{
							fontSize: "2.25rem",
							fontWeight: 700,
						}}
					>
						{data?.title}
					</Typography>
				</Stack>
			</Stack>
			<Stack justifyContent="space-between" direction="row" alignItems="center">
				<Stack direction="row" gap={2} alignItems="center">
					<Typography
						fontSize={14}
						color={theme.palette.grey[600]}
					>{`By ${data?.user.username} | ${data?.createdAt ? format(new Date(data?.createdAt ?? ""), "MM/dd/yyyy") : ""}`}</Typography>
					{!data?.imageUrl && (
						<Stack bgcolor={theme.palette.grey[900]} borderRadius={8} p={1}>
							<Typography
								fontSize={18}
								fontWeight={600}
								color={theme.palette.common.white}
							>
								{data?.tag}
							</Typography>
						</Stack>
					)}
				</Stack>
				<Stack direction="row" gap={1}>
					{userInfo?.id === data?.user.id && (
						<Button
							variant="outlined"
							onClick={() => setModal(true)}
							startIcon={<EditIcon />}
						>
							{t(TranslationResources.Post.Post.editButton)}
						</Button>
					)}
					{(userInfo?.id === data?.user.id ||
						userInfo?.roles?.includes("Administrator")) && (
						<Button
							variant="contained"
							color="error"
							startIcon={<DeleteIcon />}
							onClick={() => setDeleteDialog(true)}
						>
							{t(TranslationResources.Post.Post.deleteButton)}
						</Button>
					)}
				</Stack>
			</Stack>
			<Box sx={{ fontSize: "16px" }}>
				{data?.body && parse(data.body, options)}
			</Box>

			{data?.status === PostStatus.Pending &&
				userInfo?.roles?.includes("Administrator") && (
					<Stack
						p={1}
						border={`1px solid ${theme.palette.grey[100]}`}
						borderRadius={"8px"}
						gap={1}
					>
						<Typography fontSize="20px" fontWeight={600}>
							{t(TranslationResources.Post.Post.adminReview)}
						</Typography>
						<Stack direction={"row"} gap={1}>
							<Button
								fullWidth
								variant="contained"
								color="success"
								startIcon={<CheckIcon />}
								onClick={() => handlePending(true)}
							>
								{t(TranslationResources.Post.Post.approve)}
							</Button>
							<Button
								fullWidth
								variant="contained"
								color="error"
								startIcon={<CloseIcon />}
								onClick={() => handlePending(false)}
							>
								{t(TranslationResources.Post.Post.reject)}
							</Button>
						</Stack>
					</Stack>
				)}

			<CommentComponent postId={Number(id)} />

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
					<PostFormComponent
						post={data}
						id={Number(id)}
						setDialogOpen={setModal}
					/>
				</Stack>
			</Modal>

			<ConfirmationDialog
				open={deleteDialog}
				title={t(TranslationResources.Post.DeletePostDialog.title)}
				body={t(TranslationResources.Post.DeletePostDialog.content)}
				onClose={handleDeleteDialogClose}
			/>
		</Stack>
	);
};
