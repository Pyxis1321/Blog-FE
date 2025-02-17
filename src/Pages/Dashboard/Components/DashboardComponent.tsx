import {
	Avatar,
	Box,
	Button,
	Grid2,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { useDashboardAllPostsQuery } from "../../../API/Dashboard/useDashboardAllPostsQuery";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../Shared/Routing/Routing";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { format } from "date-fns";

export const sanitizeHtml = (html: string): string => {
	if (!html) return "";
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	return doc.body.textContent || "";
};

type Props = {
	setFetching: (fetching: boolean) => void;
	setModal: (modal: boolean) => void;
};

export const DashboardComponent: React.FC<Props> = ({
	setFetching,
	setModal,
}) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();

	const { data, isFetching } = useDashboardAllPostsQuery();
	const [search, setSearch] = useState("");

	useEffect(() => {
		setFetching(isFetching);
	}, [isFetching, setFetching]);

	const handleClick = (postId: number) => {
		navigate(Routing.Post.path(postId));
	};

	return (
		<Stack gap={4}>
			{!isFetching && (
				<Stack justifyContent="space-between" direction="row">
					<Stack width="40%">
						<TextField
							value={search}
							placeholder={t(TranslationResources.Dashboard.placeholder)}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</Stack>
					<Button variant="contained" onClick={() => setModal(true)}>
						{t(TranslationResources.Dashboard.addPost)}
					</Button>
				</Stack>
			)}
			<Grid2 container spacing={2}>
				{data
					?.filter((post) =>
						post?.title?.toLowerCase().includes(search.toLowerCase()),
					)
					.map((post) => (
						<Grid2 key={post.id} size={{ xs: 12, sm: 6, md: 3 }}>
							<Stack
								borderRadius={2}
								sx={{
									cursor: "pointer",
									border: (t) => `1px solid ${t.palette.grey[200]}`,
									width: "100%",
									height: 400,
								}}
								onClick={() => handleClick(post.id)}
							>
								<Stack p={1}>
									<Typography variant="h2" noWrap pt={1} pb={2}>
										{post.title}
									</Typography>
								</Stack>
								{post.imageUrl ? (
									<Box
										component="img"
										src={post.imageUrl ?? ""}
										alt="default"
										sx={{
											display: "block",
											mx: "auto",
											width: "95%",
											height: "250px",
											objectFit: "contain",
											borderTopLeftRadius: 8,
											borderTopRightRadius: 8,
											borderBottomRightRadius: 8,
											borderBottomLeftRadius: 8,
										}}
									/>
								) : (
									<Stack
										alignItems="center"
										justifyContent="center"
										sx={{ width: "100%", height: "250px" }}
									>
										<ImageNotSupportedIcon
											sx={{ width: "100%", height: "100%" }}
										/>
									</Stack>
								)}
								<Stack p={1} height="100%" justifyContent="center">
									<Stack
										justifyContent="space-between"
										direction="row"
										alignItems="center"
									>
										<Stack direction="row" alignItems="center" gap={1}>
											<Avatar
												alt=""
												src={`https://avatar.vercel.sh/${post.user.id}`}
											/>
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
						</Grid2>
					))}
			</Grid2>
		</Stack>
	);
};
