import PostPreviewList from "@/components/PostPreviewUi/PostPreviewList/PostPreviewList";

import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import TagList from "@/components/TagsUi/TagList/TagList";
import { getAllPosts, getAllTags } from "@/content";
import { Metadata } from "next";
import style from "./page.module.css";

export const metadata: Metadata = {
	title: "Menu | Bison Voyageur",
	description:
		"Ici sont répertoriés tous les articles et tags du blog Bison Voyageur.",
	metadataBase: new URL("https://bisonvoyageur.com"),
};

/**
 * Main Menu Page component
 */
export default function MainMenuPage() {
	const allPosts = getAllPosts();
	const allTags = getAllTags();

	return (
		<div className={style.wrapper}>
			<AnimatedTitle className={style.mainTitle} type="h1">
				Menu général
			</AnimatedTitle>
			<section>
				<AnimatedTitle
					className={style.subTitle}
					type="h2"
					motionInitialDelay={0.1}
				>
					Tous les tags
				</AnimatedTitle>
				<TagList tags={allTags} motionInitialDelay={0.2} />
			</section>

			<section>
				<AnimatedTitle
					className={style.subTitle}
					type="h2"
					motionInitialDelay={0.5}
				>
					Tous les posts
				</AnimatedTitle>
				<PostPreviewList posts={allPosts} motionInitialDelay={0.6} />
			</section>
		</div>
	);
}
