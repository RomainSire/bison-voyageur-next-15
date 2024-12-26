import { getAllTags, getPostsByTag } from "@/actions/postsActions";
import PostPreviewList from "@/components/PostPreviewUi/PostPreviewList/PostPreviewList";
import { REVALIDATE_TIME } from "@/publicConfig";
import style from "./page.module.css";

type TagPageProps = {
	params: Promise<{
		tag: string;
	}>;
};

/**
 * Revalidate time in seconds
 */
export const revalidate = REVALIDATE_TIME;

/**
 * Generate the static params for the tag pages, used for the static generation
 */
export async function generateStaticParams() {
	const tags = await getAllTags();
	return tags.map((tag) => ({ tag }));
}

/**
 * Tag Page component
 */
export default async function TagPage({ params }: TagPageProps) {
	const tag = (await params).tag;
	const decodedTag = decodeURIComponent(tag);
	const taggedPosts = await getPostsByTag(decodedTag);

	return (
		<div className={style.wrapper}>
			<h1 className={`${style.mainTitle} entryAnimation`}>Tag: {decodedTag}</h1>
			<PostPreviewList posts={taggedPosts} motionInitialDelay={0.1} />
		</div>
	);
}
