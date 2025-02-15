import { Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterPostQuery } from "../../API/Dashboard/useFilterPostQuery";
import parse from "html-react-parser";
import { CommentComponent } from "./Components/CommentComponent";
import { ConfirmationDialog } from "../../Shared/Components/ConfirmationDialog";
import { TranslationResources } from "../../Translations/EnglishTranslation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDeletePostMutation } from "../../API/Dashboard/mutations/useDeletePostMutation";
import DeleteIcon from "@mui/icons-material/Delete";

export const PostPage: React.FunctionComponent = (_) => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { data } = useFilterPostQuery(Number(id));
	const { mutate: deletePost } = useDeletePostMutation();

	const [deleteDialog, setDeleteDialog] = useState(false);

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

	return (
		<Stack p={3}>
			<Stack justifyContent={"end"} alignItems={"end"} pb={3}>
				<Button
					color="error"
					startIcon={<DeleteIcon />}
					onClick={() => setDeleteDialog(true)}
				>
					{t(TranslationResources.Post.Post.deleteButton)}
				</Button>
			</Stack>
			{data?.body && parse(data.body)}
			<CommentComponent postId={Number(id)} />

			<ConfirmationDialog
				open={deleteDialog}
				title={t(TranslationResources.Post.DeletePostDialog.title)}
				onClose={handleDeleteDialogClose}
			/>
		</Stack>
	);
};
