import { Button, Divider, Stack, Typography } from "@mui/material";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { useTranslation } from "react-i18next";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../Shared/Components/Form/FormInput";
import { FormQuillInput } from "../../../Shared/Components/Form/FormTextEdit";
import { useUploadPostMutation } from "../../../API/Dashboard/mutations/useUploadPostMutation";
import {
	PostStatus,
	PostTag,
	type CreatePostDTO,
	type EditPostDto,
	type PostDTO,
} from "../../../Shared/Api";
import type { FC, PropsWithChildren } from "react";
import { useEditPostMutation } from "../../../API/Dashboard/mutations/useEditPostMutation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../../API/Dashboard/keys";
import {
	FormSelect,
	type SelectOption,
} from "../../../Shared/Components/Form/FormSelect";

const Translations = TranslationResources;

export type Props = {
	id?: number;
	post?: PostDTO;
	setDirty?: (dirty: boolean) => void;
	setDialogOpen?: (open: boolean) => void;
};

export const PostFormComponent: FC<PropsWithChildren<Props>> = ({
	id,
	post,
	setDirty,
	setDialogOpen,
}) => {
	const { t } = useTranslation();
	const queryClient = useQueryClient();

	const { mutate: createPost } = useUploadPostMutation();
	const { mutate: editPost } = useEditPostMutation();

	const tagOptions: SelectOption[] = Object.values(PostTag).map((tag) => ({
		value: tag,
		label: tag,
	}));

	const PostFormModelSchema = z.object({
		title: z
			.string({
				required_error: t(TranslationResources.Auth.Form.required),
			})
			.min(1, { message: t(TranslationResources.Auth.Form.required) }),
		body: z
			.string({
				required_error: t(TranslationResources.Auth.Form.required),
			})
			.min(1, { message: t(TranslationResources.Auth.Form.required) }),
		imageUrl: z.string(),
		tag: z.nativeEnum(PostTag, {
			required_error: t(TranslationResources.Auth.Form.required),
		}),
	});

	type PostFormModel = z.infer<typeof PostFormModelSchema>;

	const form = useForm<PostFormModel>({
		resolver: zodResolver(PostFormModelSchema),
		defaultValues: {
			title: post?.title ?? "",
			body: post?.body ?? "",
			imageUrl: post?.imageUrl ?? "",
			tag: post?.tag ?? PostTag.Other,
		},
	});

	const {
		control,
		handleSubmit,
		formState: { isDirty },
	} = form;

	setDirty?.(isDirty);

	const closeDialog = (showError = false) => {
		setDialogOpen?.(false);
		if (showError) {
			toast.error(t(Translations.Post.PostForm.saveError));
		}
	};

	const submit = (data: CreatePostDTO) => {
		if (!id) {
			createPost(data, {
				onSuccess: () => closeDialog(),
				onError: () => closeDialog(true),
			});
			return;
		}

		const post: EditPostDto = {
			title: data.title,
			body: data.body,
			imageUrl: data.imageUrl,
			tag: data.tag,
			status: PostStatus.Published,
		};

		editPost(
			{ post, id },
			{
				onSuccess: () => {
					closeDialog();
					queryClient.invalidateQueries({
						queryKey: dashboardKeys.filterPosts(id),
					});
				},

				onError: () => closeDialog(true),
			},
		);
	};

	return (
		<Stack bgcolor={(t) => t.palette.grey[100]} p={2} borderRadius={2}>
			<form onSubmit={handleSubmit(submit)}>
				<Stack gap={2}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="h2">
							{id
								? t(Translations.Post.PostForm.headerTitleEdit)
								: t(Translations.Post.PostForm.headerTitle)}
						</Typography>
						<Stack alignItems="end" justifyContent="end">
							<Button type="submit" color="primary" variant="contained">
								{t("Post.PostForm.postButton")}
							</Button>
						</Stack>
					</Stack>
					<Divider sx={{ borderBottomWidth: 2 }} />
					<FormInput
						control={control}
						name="title"
						label={t(Translations.Post.PostForm.title)}
					/>
					<FormInput
						control={control}
						name="imageUrl"
						label={t(Translations.Post.PostForm.image)}
					/>
					<FormSelect
						control={control}
						name="tag"
						options={tagOptions}
						label={t(Translations.Post.PostForm.tag)}
					/>
					<FormQuillInput control={control} name="body" />
				</Stack>
			</form>
		</Stack>
	);
};
