import { Stack, Typography } from "@mui/material";

type Props = {
	bgColor: string;
	text: string;
};

export const Tag: React.FunctionComponent<Props> = ({ bgColor, text }) => {
	return (
		<Stack
			bgcolor={bgColor}
			borderRadius={8}
			py={0.4}
			px={1}
			alignItems={"center"}
			alignSelf="flex-start"
		>
			<Typography variant="body1" fontWeight={600}>
				{text}
			</Typography>
		</Stack>
	);
};
