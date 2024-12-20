import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Editor, EditorState } from "draft-js";

const Translations = TranslationResources.Post;

export const NewPostComponent: React.FunctionComponent = (_) => {
	const { t } = useTranslation();
	const theme = useTheme();

	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty(),
	);
	return (
		<Stack alignItems="center" justifyContent="center" height="100vh">
			<Stack
				bgcolor={(t) => t.palette.grey[100]}
				p={2}
				borderRadius={2}
				width="60%"
			>
				<Typography variant="h2" pb={1}>
					{t(Translations.NewPost.title)}
				</Typography>
				<Divider sx={{ borderBottomWidth: 2 }} />
			</Stack>
			<Editor editorState={editorState} onChange={setEditorState} />
		</Stack>
	);
};
