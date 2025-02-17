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

	return (
		<Stack px={25} pt={5} gap={3}>
			{data?.imageUrl && (
				<Stack>
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
				<Typography
					fontSize={14}
					color={theme.palette.grey[600]}
				>{`By ${data?.user.username} | ${data?.createdAt ? format(new Date(data?.createdAt ?? ""), "MM/dd/yyyy") : ""}`}</Typography>
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
