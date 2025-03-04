import {
	Button,
	Grid2,
	Stack,
	TextField,
	Typography,
	ButtonBase,
	Box,
	useTheme,
} from "@mui/material";
import { useDashboardAllPostsQuery } from "../../../API/Dashboard/useDashboardAllPostsQuery";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../Shared/Routing/Routing";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { usePostHog } from "posthog-js/react";
import { PostCard } from "./PostCard";
import type { PostDTO } from "../../../Shared/Api";
import { useUserInfo } from "../../../API/Auth/useUserInfo";

export enum PostTag {
	Science = "Science",
	Cooking = "Cooking",
	Nature = "Nature",
	Sport = "Sport",
	Other = "Other",
}

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

export const PostsComponent: React.FC<Props> = ({ setFetching, setModal }) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();
	const posthog = usePostHog();
	const { data: userInfo } = useUserInfo();

	const { data, isFetching } = useDashboardAllPostsQuery();
	const [search, setSearch] = useState("");
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const allTags = Object.values(PostTag);

	useEffect(() => {
		setFetching(isFetching);
	}, [isFetching, setFetching]);

	const handleClick = (post: PostDTO) => {
		if (post.id && userInfo?.id && post.tag) {
			posthog.capture("post_clicked", {
				post_id: post.id,
				user_id: userInfo.id,
				tag: post.tag,
			});
		}
		navigate(Routing.Post.path(post.id));
	};

	const handleTagClick = (tag: string) => {
		setSelectedTag(selectedTag === tag ? null : tag);
	};

	return (
		<Stack gap={3}>
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

			<Stack direction="row" gap={0.6} flexWrap="wrap">
				{allTags.map((tag) => (
					<Box
						component={ButtonBase}
						key={tag}
						onClick={() => handleTagClick(tag)}
						bgcolor={
							selectedTag === tag ? theme.palette.primary.main : undefined
						}
						p={1}
						border={`1px solid ${theme.palette.grey[100]}`}
						borderRadius={2}
					>
						<Typography fontWeight={500} fontSize={14}>
							{tag}
						</Typography>
					</Box>
				))}
			</Stack>

			<Grid2 container spacing={2}>
				{data
					?.filter((post) => {
						const matchesSearch = post?.title
							?.toLowerCase()
							.includes(search.toLowerCase());
						const matchesTag = selectedTag ? post.tag === selectedTag : true;
						return matchesSearch && matchesTag;
					})
					.map((post) => (
						<Grid2 key={post.id}>
							<PostCard post={post} onClick={() => handleClick(post)} />
						</Grid2>
					))}
			</Grid2>
		</Stack>
	);
};
