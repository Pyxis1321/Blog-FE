import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useDashboardAllPostsQuery } from "../../API/Dashboard/useDashboardAllPostsQuery";

export const Dashboard: React.FunctionComponent = (_) => {
	const theme = useTheme();
	const { data, refetch } = useDashboardAllPostsQuery();

	const handleClick = () => {
		refetch;
	};
	return (
		<Stack>
			<Typography color={theme.palette.primary.main}>test</Typography>
			<Button onClick={handleClick}>Refresh</Button>
		</Stack>
	);
};
