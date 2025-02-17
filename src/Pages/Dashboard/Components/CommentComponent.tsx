import { Button, Stack, Typography, useTheme } from "@mui/material";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { useTranslation } from "react-i18next";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../Shared/Components/Form/FormInput";
import type { CreateCommentDTO } from "../../../Shared/Api";
import type { FC, PropsWithChildren } from "react";
import { useUploadCommentMutation } from "../../../API/Comments/useUploadCommentMutation";
import { useCommentsQuery } from "../../../API/Comments/useCommentsQuery";
import { format } from "date-fns";

const Translations = TranslationResources.Post.Comments;

export type Props = {
	postId: number;
};

export const CommentComponent: FC<PropsWithChildren<Props>> = ({ postId }) => {
	const { t } = useTranslation();
	const theme = useTheme();

	const { data: comments } = useCommentsQuery(postId);
	const { mutate } = useUploadCommentMutation();

	const PostCommentSchema = z.object({
		postId: z.number(),
		body: z.string({
			required_error: t(TranslationResources.Auth.Form.required),
		}),
	});

	type CommentFormModel = z.infer<typeof PostCommentSchema>;

	const form = useForm<CommentFormModel>({
		resolver: zodResolver(PostCommentSchema),
		defaultValues: {
			postId: postId,
			body: "",
		},
	});

	const { control, handleSubmit } = form;

	const submit = (data: CreateCommentDTO) => {
		mutate(data);
		form.setValue("body", "");
	};

	return (
		<Stack pb={2} gap={3}>
			<Typography variant="h5" fontWeight={700}>
				{t(Translations.title)}
			</Typography>
			<Stack>
				<form onSubmit={handleSubmit(submit)}>
					<Stack gap={2}>
						<Typography variant="h3">
							{t(Translations.postNewComment)}
						</Typography>
						<FormInput control={control} name="body" />
						<Stack width="10%">
							<Button type="submit" color="primary" variant="contained">
								{t("Post.PostForm.postButton")}
							</Button>
						</Stack>
					</Stack>
				</form>
			</Stack>
			<Stack gap={1}>
				{comments?.map((comment) => (
					<Stack
						key={comment.id}
						bgcolor={(t) => t.palette.grey[50]}
						gap={1}
						p={1.6}
						borderRadius={2}
					>
						<Stack justifyContent="space-between" direction="row">
							<Typography variant="h3">{comment.user.username}</Typography>
							<Typography fontSize={14} color={theme.palette.grey[600]}>
								{format(new Date(comment.createdAt), "MM/dd/yyyy")}
							</Typography>
						</Stack>
						<Typography fontSize={16}>{comment.body}</Typography>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
};
