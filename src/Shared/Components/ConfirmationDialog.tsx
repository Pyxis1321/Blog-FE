import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

export type Props = {
	title: string;
	body: string;
	open: boolean;
	onClose: (confirmed: boolean) => void;
	confirmButtonLabel: string;
	cancelButtonLabel: string;
};

export const ConfirmationDialog: React.FunctionComponent<Props> = ({
	title,
	body,
	open,
	onClose,
	confirmButtonLabel,
	cancelButtonLabel,
}) => {
	return (
		<Dialog open={open}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{body}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose(false)}>{cancelButtonLabel}</Button>
				<Button onClick={() => onClose(true)} autoFocus>
					{confirmButtonLabel}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
