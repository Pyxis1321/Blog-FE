import {
	Avatar,
	Box,
	Divider,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import type { PostCardProps } from "./PostCardVertical";
import { sanitizeHtml } from "./DashboardComponent";
import { format } from "date-fns";
import { PostStatus } from "../../../Shared/Api";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

export const PENDING_LIGHT = "#a16207";
export const PENDING_DARK = "#713f12";

export const PostCardHorizontal: React.FC<PostCardProps> = ({
	post,
	onClick,
	stateTag,
}) => {
	const theme = useTheme();
	console.log("post: ", post);

	return (
		<Stack
			sx={{ border: `1px solid ${theme.palette.grey[100]}`, cursor: "pointer" }}
			borderRadius={1}
			direction={"row"}
			onClick={() => onClick(post.id)}
		>
			{post.imageUrl ? (
				<Box
					sx={{
						width: 200,
						height: 250,
						flexShrink: 0,
						overflow: "hidden",
						borderTopLeftRadius: 4,
						borderBottomLeftRadius: 4,
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
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
					sx={{ width: 200, height: 250 }}
				>
					<ImageNotSupportedIcon sx={{ width: 200, height: "100%" }} />
				</Stack>
			)}
			<Stack justifyContent={"space-between"} width="100%">
				<Stack px={2} pt={2} gap={1}>
					<Typography
						variant="h4"
						sx={{
							overflow: "hidden",
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: 2,
						}}
					>
						{post.title}
					</Typography>
					<Stack direction="row" gap={1}>
						<Stack
							bgcolor={theme.palette.grey[100]}
							borderRadius={8}
							py={0.4}
							px={1}
							alignItems={"center"}
							alignSelf="flex-start"
							sx={{ border: `1px solid ${theme.palette.grey[300]}` }}
						>
							<Typography variant="body1" fontWeight={600}>
								{post.tag}
							</Typography>
						</Stack>
						{stateTag && (
							<Stack
								bgcolor={
									post.status === PostStatus.Pending
										? "#713f12"
										: post.status === PostStatus.Published
											? "#14532d"
											: "#7f1d1d"
								}
								sx={{
									border: `1px solid ${
										post.status === PostStatus.Pending
											? "#a16207"
											: post.status === PostStatus.Published
												? "#15803d"
												: "#b91c1c"
									}`,
								}}
								borderRadius={8}
								py={0.4}
								px={1}
								alignItems={"center"}
								alignSelf="flex-start"
							>
								<Typography
									variant="body1"
									fontWeight={600}
									color={
										theme.palette.mode === "dark"
											? theme.palette.common.black
											: theme.palette.common.white
									}
								>
									{post.status}
								</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
				<Stack px={2}>
					<Stack>
						<Typography
							sx={{
								overflow: "hidden",
								display: "-webkit-box",
								WebkitBoxOrient: "vertical",
								WebkitLineClamp: 2,
							}}
							color={theme.palette.grey[800]}
							variant="h3"
							lineHeight={1.75}
							fontWeight={300}
						>
							{sanitizeHtml(post.body ?? "")}
						</Typography>
					</Stack>
				</Stack>
				<Stack justifyContent="center">
					<Divider sx={{ padding: 0, margin: 0 }} />
					<Stack direction="row" alignItems="center" p={2} gap={1}>
						<Avatar alt="" src={`https://avatar.vercel.sh/${post.user.id}`} />
						<Stack>
							<Typography fontSize="14px" fontWeight="500">
								{post.user.username}
							</Typography>
							<Typography
								fontSize="12px"
								fontWeight="300"
								color={theme.palette.grey[500]}
							>
								{format(new Date(post.createdAt), "MM/dd/yyyy")}
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};
