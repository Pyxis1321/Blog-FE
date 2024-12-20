import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFilterPostQuery } from "../../API/Dashboard/useFilterPostQuery";

export const PostPage: React.FunctionComponent = (_) => {
	const { id } = useParams<{ id: string }>();
	const { data } = useFilterPostQuery(Number(id));

	return (
		<Stack>
			<Typography>Post {id}</Typography>
		</Stack>
	);
};
