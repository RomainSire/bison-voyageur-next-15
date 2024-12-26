import { getAllPosts, getAllTags } from "@/actions/postsActions";
import PostPreviewList from "@/components/PostPreviewUi/PostPreviewList/PostPreviewList";

import TagList from "@/components/TagsUi/TagList/TagList";
import { REVALIDATE_TIME } from "@/publicConfig";
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
			<h1 className={`${style.mainTitle} entryAnimation`}>Menu général</h1>

			<h2 className={`${style.subTitle} entryAnimation delay2`}>
				Tous les tags
			</h2>
			<TagList tags={allTags} motionInitialDelay={0.25} />

			<h2 className={`${style.subTitle} entryAnimation delay6`}>
				Tous les posts
			</h2>
			<PostPreviewList posts={allPosts} motionInitialDelay={0.7} />
		</div>
	);
}
