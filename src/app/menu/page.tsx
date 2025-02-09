import PostPreviewList from "@/components/PostPreviewUi/PostPreviewList/PostPreviewList";

import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import TagList from "@/components/TagsUi/TagList/TagList";
import { REVALIDATE_TIME } from "@/publicConfig";
import { getAllPosts, getAllTags } from "@/services/postService";
import style from "./page.module.css";

/**
 * Revalidate time in seconds
 */
export const revalidate = REVALIDATE_TIME;

/**
 * Main Menu Page component
 */
export default async function MainMenuPage() {
	const allPosts = await getAllPosts();
	const allTags = await getAllTags();

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
