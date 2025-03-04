import { Grid2, Stack, Typography } from "@mui/material";
import { useDashboardAllPostsQuery } from "../../../API/Dashboard/useDashboardAllPostsQuery";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../Shared/Routing/Routing";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TranslationResources } from "../../../Translations/EnglishTranslation";
import { usePostHog } from "posthog-js/react";
import { useGetTrendingPosts } from "../../../API/Analytics/useGetTrendingPosts";
import type { TopPost } from "../../../API/Analytics/getAnalytics";
import { PostCard } from "./PostCard";
import type { PostDTO, PostTag } from "../../../Shared/Api";
import { useGetPersonilizedPosts } from "../../../API/Analytics/useGetPersonilizedPosts";
import { useUserInfo } from "../../../API/Auth/useUserInfo";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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

export const DashboardComponent: React.FC<Props> = ({ setFetching }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const posthog = usePostHog();

	const { data: userInfo } = useUserInfo();
	const { data, isFetching } = useDashboardAllPostsQuery();
	const { data: trendingPosts } = useGetTrendingPosts();
	const { data: personalizedPosts } = useGetPersonilizedPosts(
		userInfo?.id ?? "",
	);

	const tp = trendingPosts as unknown as [string, number][];
	const topPosts: TopPost[] = tp?.map(([postId, count]) => ({ postId, count }));
	const topPostIds: string[] = topPosts?.map((post) => post.postId);

	const filteredPosts = useMemo(() => {
		return data?.filter((post) => topPostIds.includes(post.id.toString()));
	}, [data, topPostIds]);

	const pp = personalizedPosts as unknown as [string, number][];
	const personilizedSection = useMemo(() => {
		if (!personalizedPosts || personalizedPosts.length === 0 || !data)
			return [];
		const targetTag = pp[0][0] as PostTag;
		const postsByTag = data.filter((post) => post.tag === targetTag);
		const shuffledPosts = [...postsByTag].sort(() => Math.random() - 0.5);
		return shuffledPosts.slice(0, 3);
	}, [data, personalizedPosts, pp]);

	useEffect(() => {
		setFetching(isFetching);
	}, [isFetching, setFetching]);

	const handleClick = (post: PostDTO) => {
		if (post.id && post.user.id && post.tag) {
			posthog.capture("post_clicked", {
				post_id: post.id,
				user_id: post.user.id,
				tag: post.tag,
			});
		}
		navigate(Routing.Post.path(post.id));
	};

	return (
		<Stack gap={4}>
			{personilizedSection.length > 0 && (
				<Stack direction="row" alignItems="center" gap={1}>
					<AutoAwesomeIcon fontSize="large" />
					<Typography variant="h2" fontWeight={700}>
						{t(TranslationResources.Dashboard.Tabs.Home.forYou)}
					</Typography>
				</Stack>
			)}
			<Grid2 container spacing={2}>
				{personilizedSection.map((post) => (
					<Grid2 key={post.id}>
						<PostCard post={post} onClick={() => handleClick(post)} />
					</Grid2>
				))}
			</Grid2>
			<Stack direction="row" alignItems="center" gap={1}>
				<TrendingUpIcon fontSize="large" />
				<Typography variant="h2" fontWeight={700}>
					{t(TranslationResources.Dashboard.Tabs.Home.trending)}
				</Typography>
			</Stack>
			<Grid2 container spacing={2}>
				{filteredPosts?.map((post) => (
					<Grid2 key={post.id}>
						<PostCard post={post} onClick={() => handleClick(post)} />
					</Grid2>
				))}
			</Grid2>
		</Stack>
	);
};
