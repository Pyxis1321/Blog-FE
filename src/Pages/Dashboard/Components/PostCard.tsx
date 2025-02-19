import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { format } from "date-fns";
import type { PostDTO } from "../../../Shared/Api";
import { sanitizeHtml } from "./DashboardComponent";

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
				width: 320,
				height: 480,
			}}
			p={2.4}
			gap={2.4}
			onClick={() => onClick(post.id)}
		>
			<Stack
				gap={1}
				direction="row"
				justifyContent="space-between"
				alignItems="flex-start"
				width="100%"
			>
				<Stack sx={{ flex: 1, minWidth: 0 }}>
					{" "}
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: 3,
						}}
					>
						{post.title}
					</Typography>
				</Stack>
				<Stack>
					<Stack
						bgcolor={theme.palette.grey[100]}
						borderRadius={8}
						px={1}
						py={0.4}
					>
						<Typography variant="body1" fontWeight={600}>
							{post.tag}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Stack>
				<Typography
					sx={{
						overflow: "hidden",
						display: "-webkit-box",
						WebkitBoxOrient: "vertical",
						WebkitLineClamp: 2,
					}}
					color={theme.palette.grey[700]}
					variant="h3"
					lineHeight={1.75}
					fontWeight={300}
				>
					{sanitizeHtml(post.body ?? "")}
				</Typography>
			</Stack>
			{post.imageUrl ? (
				<Box
					sx={{
						position: "relative",
						width: "95%",
						height: 250,
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
			<Stack justifyContent="center">
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
