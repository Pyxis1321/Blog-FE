import {
	Box,
	Button,
	CircularProgress,
	Modal,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { useDashboardAllPostsQuery } from "../../API/Dashboard/useDashboardAllPostsQuery";
import { useAtomValue } from "jotai";
import { sessionState } from "../../Shared/State/SessionAtom";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../Shared/Routing/Routing";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TranslationResources } from "../../Translations/EnglishTranslation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { NewPostComponent } from "../Auth/Compontnts/NewPostComponent";

const Translations = TranslationResources.Dashboard;

export const Dashboard: React.FunctionComponent = (_) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();

	const [modal, setModal] = useState(false);

	const sessionAtom = useAtomValue(sessionState);
	const { data, isFetching } = useDashboardAllPostsQuery({
		enabled: sessionAtom.accessToken !== "",
	});

	const handleClick = (postId: number) => {
		navigate(Routing.Post.path(postId));
	};

	return (
		<Stack>
			{isFetching && (
				<Stack alignItems="center" pt={8}>
					<CircularProgress />
				</Stack>
			)}
			{!isFetching && (
				<Stack pt={5} pr={5} alignItems="end">
					<Button
						startIcon={<AddCircleOutlineIcon />}
						onClick={() => setModal(true)}
					>
						{t(Translations.addPost)}
					</Button>
				</Stack>
			)}
			<Stack width="70%" pt={5} gap={4} px={5} direction="row">
				{data?.map((post) => (
					<Stack
						key={post.id}
						bgcolor={theme.palette.grey[50]}
						borderRadius={2}
						width={300}
						sx={{ cursor: "pointer" }}
						onClick={() => handleClick(post.id)}
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
			<Modal open={modal} onClose={() => setModal(false)}>
				<NewPostComponent />
			</Modal>
		</Stack>
	);
};
