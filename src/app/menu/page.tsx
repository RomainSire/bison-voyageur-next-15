import { getAllPosts, getAllTags } from "@/actions/postsActions";
import PostPreviewList from "@/components/PostPreviewList/PostPreviewList";
import { REVALIDATE_TIME } from "@/publicConfig";
import Link from "next/link";
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
			<h1 className={style.mainTitle}>Menu général</h1>

			<h2 className={style.subTitle}>Tous les tags</h2>
			<ul>
				{allTags.map((tag) => (
					<li key={tag}>
						<Link href={`/tag/${encodeURIComponent(tag)}`}>{tag}</Link>
					</li>
				))}
			</ul>

			<h2 className={style.subTitle}>Tous les posts</h2>
			<PostPreviewList posts={allPosts} />
		</div>
	);
}
