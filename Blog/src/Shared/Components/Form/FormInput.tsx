import { TextField, type TextFieldProps } from "@mui/material";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

type Props<FormType extends FieldValues, TName> = TextFieldProps & {
	control: Control<FormType, object>;
	name: TName;
	title?: string;
	onChange?: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
};

export const FormInput = <
	FormType extends FieldValues = FieldValues,
	TName extends FieldPath<FormType> = FieldPath<FormType>,
>({
	control,
	name,
	title,
	...rest
}: Props<FormType, TName>) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, value, onBlur },
				fieldState: { error },
			}) => (
				<TextField
					value={value}
					multiline={rest.type !== "password"}
					title={title}
					error={!!error?.message}
					helperText={error?.message}
					onChange={(e) => {
						onChange(e);
					}}
					onBlur={onBlur}
					{...rest}
				/>
			)}
		/>
	);
};
