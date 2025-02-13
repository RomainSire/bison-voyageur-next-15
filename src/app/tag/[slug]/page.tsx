import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import PostPreviewList from "@/components/PostPreviewUi/PostPreviewList/PostPreviewList";
import { REVALIDATE_TIME } from "@/publicConfig";
import { getPostsByTag } from "@/services/postService";
import { getAllTags, getTagBySlug } from "@/services/tagService";
import { notFound } from "next/navigation";
import style from "./page.module.css";

type TagPageProps = {
	params: Promise<{
		slug: string;
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
	return tags.map((tag) => ({ slug: tag.fields.slug }));
}

/**
 * Tag Page component
 */
export default async function TagPage({ params }: TagPageProps) {
	const tagSlug = (await params).slug;
	const tag = await getTagBySlug(tagSlug);
	const taggedPosts = await getPostsByTag(tag.sys.id);

	if (taggedPosts.length === 0) {
		notFound();
	}

	return (
		<div className={style.wrapper}>
			<AnimatedTitle className={style.mainTitle} type="h1">
				Tag: {tag.fields.name}
			</AnimatedTitle>
			<PostPreviewList posts={taggedPosts} motionInitialDelay={0.1} />
		</div>
	);
}
