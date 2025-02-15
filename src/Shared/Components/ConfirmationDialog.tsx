import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { TranslationResources } from "../../Translations/EnglishTranslation";

export type Props = {
	title: string;
	body?: string;
	JSXbody?: JSX.Element;
	open: boolean;
	onClose: (confirmed: boolean) => void;
	confirmButtonLabel?: string;
	cancelButtonLabel?: string;
};

export const ConfirmationDialog: React.FunctionComponent<Props> = ({
	title,
	body,
	JSXbody,
	open,
	onClose,
	confirmButtonLabel,
	cancelButtonLabel,
}) => {
	const { t } = useTranslation();
	return (
		<Dialog open={open}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{body}</DialogContentText>
				{JSXbody}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose(false)}>
					{cancelButtonLabel ??
						t(TranslationResources.Components.Dialog.cancelButton)}
				</Button>
				<Button onClick={() => onClose(true)} autoFocus>
					{confirmButtonLabel ??
						t(TranslationResources.Components.Dialog.confirmButton)}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
