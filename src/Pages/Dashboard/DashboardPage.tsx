import {
	Box,
	Button,
	CircularProgress,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { useDashboardAllPostsQuery } from "../../API/Dashboard/useDashboardAllPostsQuery";
import { useAtomValue } from "jotai";
import { sessionState } from "../../Shared/State/SessionAtom";

export const Dashboard: React.FunctionComponent = (_) => {
	const theme = useTheme();
	const sessionAtom = useAtomValue(sessionState);
	const { data, isFetching } = useDashboardAllPostsQuery({
		enabled: sessionAtom.accessToken !== "",
	});

	return (
		<Stack>
			{isFetching && (
				<Stack alignItems="center" pt={8}>
					<CircularProgress />
				</Stack>
			)}
			<Stack
				width="70%"
				pt={5}
				gap={4}
				px={5}
				direction="row"
				sx={{ cursor: "pointer" }}
			>
				{data?.map((post) => (
					<Stack
						key={post.id}
						bgcolor={theme.palette.grey[50]}
						borderRadius={2}
						width={300}
					>
						<Box
							component="img"
							src={post.imageUrl ?? ""}
							alt="default"
							width="100%"
							height="auto"
							sx={{
								objectFit: "cover",
								borderTopLeftRadius: 8,
								borderTopRightRadius: 8,
							}}
						/>
						<Stack p={1}>
							<Typography variant="h2">{post.title}</Typography>
							<Typography variant="subtitle1" color={theme.palette.grey[300]}>
								{post.user.userName}
							</Typography>
							<Stack>
								<Typography
									variant="body1"
									sx={{
										display: "-webkit-box",
										overflow: "hidden",
										textOverflow: "ellipsis",
										WebkitLineClamp: 2,
										WebkitBoxOrient: "vertical",
									}}
								>
									{post.body}
								</Typography>
							</Stack>
						</Stack>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
};
