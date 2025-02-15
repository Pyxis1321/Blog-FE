import { Button, Modal, Stack } from "@mui/material";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";

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
		<Stack p={3}>
			<Stack
				gap={1}
				justifyContent={"end"}
				alignItems={"end"}
				pb={3}
				direction={"row"}
			>
				{userInfo?.id === data?.user.id && (
					<Button
						color="primary"
						onClick={() => setModal(true)}
						startIcon={<AddCircleOutlineIcon />}
					>
						{t(TranslationResources.Post.Post.editButton)}
					</Button>
				)}
				<Button
					color="error"
					startIcon={<DeleteIcon />}
					onClick={() => setDeleteDialog(true)}
				>
					{t(TranslationResources.Post.Post.deleteButton)}
				</Button>
			</Stack>
			{data?.body && parse(data.body, options)}
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
				onClose={handleDeleteDialogClose}
			/>
		</Stack>
	);
};
