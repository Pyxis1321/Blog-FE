import { Button, Divider, Stack, Typography } from "@mui/material";
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

const Translations = TranslationResources.Post.Comments;

export type Props = {
	postId: number;
};

export const CommentComponent: FC<PropsWithChildren<Props>> = ({ postId }) => {
	const { t } = useTranslation();

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
	};

	return (
		<Stack pt={2} borderRadius={2} justifyContent="center" alignItems="center">
			<Stack
				bgcolor={(t) => t.palette.grey[100]}
				width="100%"
				p={2}
				borderRadius={2}
				gap={2}
			>
				<Typography variant="h1">{t(Translations.title)}</Typography>
				<form onSubmit={handleSubmit(submit)}>
					<Stack gap={1}>
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
				<Stack gap={1}>
					{comments?.map((comment) => (
						<Stack key={comment.id} gap={1}>
							<Stack>
								<Typography variant="h3">{comment.user.username}</Typography>
								<Typography variant="subtitle2">
									{comment.user.email}
								</Typography>
							</Stack>
							<Typography variant="body1">{comment.body}</Typography>
							<Divider sx={{ borderBottomWidth: 2 }} />
						</Stack>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};
