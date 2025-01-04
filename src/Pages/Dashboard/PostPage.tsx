import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFilterPostQuery } from "../../API/Dashboard/useFilterPostQuery";
import parse from "html-react-parser";
import { CommentComponent } from "./Components/CommentComponent";

export const PostPage: React.FunctionComponent = (_) => {
	const { id } = useParams<{ id: string }>();
	const { data } = useFilterPostQuery(Number(id));

	return (
		<Stack p={3}>
			{data?.body && parse(data.body)}
			<CommentComponent postId={Number(id)} />
		</Stack>
	);
};
