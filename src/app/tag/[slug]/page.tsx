import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import PostPreviewList from "@/components/PostPreviewUi/PostPreviewList/PostPreviewList";
import { getPostsByTag } from "@/services/postService";
import { getAllTags, getTagBySlug } from "@/services/tagService";
import { Metadata } from "next";
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
export const revalidate = 3600;

/**
 * Generate the static params for the tag pages, used for the static generation
 */
export async function generateStaticParams() {
	const tags = await getAllTags();
	return tags.map((tag) => ({ slug: tag.fields.slug }));
}

/**
 * Generate the metadata for the tag pages
 */
export async function generateMetadata({
	params,
}: TagPageProps): Promise<Metadata> {
	const tagSlug = (await params).slug;
	const tag = await getTagBySlug(tagSlug);

	return {
		title: `Tag: ${tag.fields.name} | Bison Voyageur`,
		description: `Tous les posts tagués avec "${tag.fields.name}".`,
		metadataBase: new URL("https://bisonvoyageur.com"),
	};
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
