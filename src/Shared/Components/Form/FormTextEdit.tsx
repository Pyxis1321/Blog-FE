import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
	Controller,
	type Control,
	type FieldValues,
	type FieldPath,
} from "react-hook-form";
import { Box, useTheme } from "@mui/material";

type FormQuillInputProps<
	FormType extends FieldValues,
	TName extends FieldPath<FormType>,
> = {
	control: Control<FormType>;
	name: TName;
};

export const FormQuillInput = <
	FormType extends FieldValues,
	TName extends FieldPath<FormType>,
>({
	control,
	name,
}: FormQuillInputProps<FormType, TName>) => {
	const theme = useTheme();
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, value, onBlur },
				fieldState: { error },
			}) => (
				<Box
					sx={{
						"& .ql-toolbar": {
							backgroundColor: theme.palette.grey[400],
						},
						height: "300px",
						overflowY: "auto",
					}}
				>
					<ReactQuill
						theme="snow"
						value={value || ""}
						onChange={(content) => onChange(content)}
						onBlur={() => onBlur()}
					/>
					{error && <p style={{ color: "red" }}>{error.message}</p>}
				</Box>
			)}
		/>
	);
};
