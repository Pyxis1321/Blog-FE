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

const Translations = TranslationResources;

export const NewPostComponent: React.FunctionComponent = (_) => {
	const { t } = useTranslation();

	const { mutate } = useUploadPostMutation();

	const PostFormModelSchema = z.object({
		title: z.string({
			required_error: t(TranslationResources.Auth.Form.required),
		}),
		body: z.string({
			required_error: t(TranslationResources.Auth.Form.required),
		}),
		picture: z.string({
			required_error: t(TranslationResources.Auth.Form.required),
		}),
	});

	type PostFormModel = z.infer<typeof PostFormModelSchema>;

	const form = useForm<PostFormModel>({
		resolver: zodResolver(PostFormModelSchema),
	});

	const { control, handleSubmit } = form;

	const submit = (data: PostFormModel) => {
		mutate(data);
	};

	return (
		<Stack alignItems="center" justifyContent="center" height="100vh">
			<Stack
				bgcolor={(t) => t.palette.grey[100]}
				p={2}
				borderRadius={2}
				width="60%"
			>
				<form onSubmit={handleSubmit(submit)}>
					<Stack gap={2}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography variant="h2">
								{t(Translations.Post.NewPost.headerTitle)}
							</Typography>
							<Stack alignItems="end" justifyContent="end">
								<Button type="submit" color="primary" variant="contained">
									{t("Post.NewPost.postButton")}
								</Button>
							</Stack>
						</Stack>
						<Divider sx={{ borderBottomWidth: 2 }} />

						<FormInput
							control={control}
							name="title"
							label={t(Translations.Post.NewPost.title)}
						/>
						<FormInput
							control={control}
							name="picture"
							label={t(Translations.Post.NewPost.image)}
						/>
						<FormQuillInput control={control} name="body" />
					</Stack>
				</form>
			</Stack>
		</Stack>
	);
};
