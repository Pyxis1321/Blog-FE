import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { format } from "date-fns";
import type { PostDTO } from "../../../Shared/Api";

export interface PostCardProps {
	post: PostDTO;
	onClick: (postId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
	const theme = useTheme();

	return (
		<Stack
			borderRadius={2}
			sx={{
				cursor: "pointer",
				border: (t) => `1px solid ${t.palette.grey[200]}`,
				width: "100%",
				height: 400,
			}}
			onClick={() => onClick(post.id)}
		>
			<Stack p={1}>
				<Typography variant="h2" noWrap pt={1} pb={2}>
					{post.title}
				</Typography>
			</Stack>
			{post.imageUrl ? (
				<Box
					sx={{
						position: "relative",
						width: "95%",
						height: 1800,
						overflow: "hidden",
						borderRadius: 2,
						mx: "auto",
					}}
				>
					<Box
						component="img"
						src={post.imageUrl ?? ""}
						alt="default"
						sx={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "center",
							display: "block",
						}}
					/>
				</Box>
			) : (
				<Stack
					alignItems="center"
					justifyContent="center"
					sx={{ width: "100%", height: "250px" }}
				>
					<ImageNotSupportedIcon sx={{ width: "100%", height: "100%" }} />
				</Stack>
			)}
			<Stack p={1} height="100%" justifyContent="center">
				<Stack
					justifyContent="space-between"
					direction="row"
					alignItems="center"
				>
					<Stack direction="row" alignItems="center" gap={1}>
						<Avatar alt="" src={`https://avatar.vercel.sh/${post.user.id}`} />
						<Typography
							fontSize="14px"
							fontWeight="500"
							color={theme.palette.grey[500]}
						>
							{post.user.username}
						</Typography>
					</Stack>
					<Typography
						fontSize="14px"
						fontWeight="500"
						color={theme.palette.grey[500]}
					>
						{format(new Date(post.createdAt), "MM/dd/yyyy")}
					</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};
