import { Button, Grid2, Stack, TextField, Typography } from "@mui/material";
import { useDashboardAllPostsQuery } from "../../../API/Dashboard/useDashboardAllPostsQuery";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../Shared/Routing/Routing";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { usePostHog } from "posthog-js/react";
import { useGetTrendingPosts } from "../../../API/Analytics/useGetTrendingPosts";
import type { TopPost } from "../../../API/Analytics/getAnalytics";
import { PostCard } from "./PostCard";

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
	const navigate = useNavigate();
	const posthog = usePostHog();

	const { data, isFetching } = useDashboardAllPostsQuery();
	const { data: trendingPosts } = useGetTrendingPosts();
	const [search, setSearch] = useState("");

	const tp = trendingPosts as unknown as [string, number][];
	const topPosts: TopPost[] = tp?.map(([postId, count]) => ({ postId, count }));
	const topPostIds: string[] = topPosts?.map((post) => post.postId);

	const filteredPosts = useMemo(() => {
		return data?.filter((post) => topPostIds.includes(post.id.toString()));
	}, [data, topPostIds]);

	useEffect(() => {
		setFetching(isFetching);
	}, [isFetching, setFetching]);

	const handleClick = (postId: number) => {
		posthog.capture("post_clicked", {
			post_id: postId,
		});
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
			<Typography variant="h2">Trending posts:</Typography>
			<Grid2 container spacing={2}>
				{filteredPosts
					?.filter((post) =>
						post?.title?.toLowerCase().includes(search.toLowerCase()),
					)
					.map((post) => (
						<Grid2 key={post.id}>
							<PostCard post={post} onClick={handleClick} />
						</Grid2>
					))}
			</Grid2>
			<Grid2 container spacing={2}>
				{data
					?.filter((post) =>
						post?.title?.toLowerCase().includes(search.toLowerCase()),
					)
					.map((post) => (
						<Grid2 key={post.id}>
							<PostCard post={post} onClick={handleClick} />
						</Grid2>
					))}
			</Grid2>
		</Stack>
	);
};
