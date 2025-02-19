import {
	FormControl,
	Select,
	MenuItem,
	FormHelperText,
	InputLabel,
	type SelectProps,
} from "@mui/material";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

export type SelectOption = {
	value: string | number;
	label: string;
};

type Props<FormType extends FieldValues, TName> = SelectProps & {
	control: Control<FormType, object>;
	name: TName;
	options: SelectOption[];
	onChange?: (
		event: React.ChangeEvent<{ name?: string; value: unknown }>,
	) => void;
};

export const FormSelect = <
	FormType extends FieldValues = FieldValues,
	TName extends FieldPath<FormType> = FieldPath<FormType>,
>({
	control,
	name,
	options,
	label,
	...rest
}: Props<FormType, TName>) => {
	// Create a unique ID for the label
	const labelId = `${name}-label`;

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, value, onBlur },
				fieldState: { error },
			}) => (
				<FormControl fullWidth error={!!error?.message} variant="outlined">
					<InputLabel id={labelId}>{label}</InputLabel>
					<Select
						labelId={labelId}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						onBlur={onBlur}
						label={label}
						{...rest}
					>
						{options.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{error?.message && <FormHelperText>{error.message}</FormHelperText>}
				</FormControl>
			)}
		/>
	);
};
