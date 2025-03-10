import {
	FormControl,
	FormHelperText,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
	Stack,
	useTheme,
} from "@mui/material";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

export type TileOption = {
	value: string | number;
	label: string;
	icon: React.ReactNode;
};

type Props<FormType extends FieldValues, TName extends FieldPath<FormType>> = {
	control: Control<FormType, object>;
	name: TName;
	options: TileOption[];
	label?: string;
	groupProps?: Omit<
		React.ComponentProps<typeof ToggleButtonGroup>,
		"value" | "onChange"
	>;
	tileProps?: Omit<React.ComponentProps<typeof ToggleButton>, "value">;
};

export const FormTileSelect = <
	FormType extends FieldValues = FieldValues,
	TName extends FieldPath<FormType> = FieldPath<FormType>,
>({
	control,
	name,
	options,
	label,
	groupProps,
	tileProps,
}: Props<FormType, TName>) => {
	const theme = useTheme();
	return (
		<FormControl fullWidth variant="outlined">
			{label && (
				<Typography variant="subtitle1" gutterBottom>
					{label}
				</Typography>
			)}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<>
						<ToggleButtonGroup
							value={value}
							exclusive
							onChange={(_, newValue) => {
								if (newValue !== null) {
									onChange(newValue);
								}
							}}
							{...groupProps}
						>
							{options.map((option) => (
								<ToggleButton
									key={option.value}
									value={option.value}
									aria-label={option.label}
									sx={{
										"&.Mui-selected": {
											backgroundColor: theme.palette.primary.main,
										},
									}}
									{...tileProps}
								>
									<Stack direction="column" alignItems="center" spacing={0.5}>
										{option.icon}
										<Typography variant="caption">{option.label}</Typography>
									</Stack>
								</ToggleButton>
							))}
						</ToggleButtonGroup>
						{error?.message && (
							<FormHelperText error>{error.message}</FormHelperText>
						)}
					</>
				)}
			/>
		</FormControl>
	);
};
