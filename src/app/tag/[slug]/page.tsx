import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import PostPreviewList from "@/components/PostPreviewUi/PostPreviewList/PostPreviewList";
import { getAllTags, getPostsByTag, getTagBySlug } from "@/content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import style from "./page.module.css";

type TagPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

/**
 * Only the tags of content/ exist: every page is generated at build time
 */
export const dynamicParams = false;

/**
 * Generate the static params for the tag pages, used for the static generation
 */
export function generateStaticParams() {
	return getAllTags().map((tag) => ({ slug: tag.slug }));
}

/**
 * Generate the metadata for the tag pages
 */
export async function generateMetadata({
	params,
}: TagPageProps): Promise<Metadata> {
	const tag = getTagBySlug((await params).slug);
	if (!tag) {
		notFound();
	}

	return {
		title: `Tag: ${tag.name} | Bison Voyageur`,
		description: `Tous les posts tagués avec "${tag.name}".`,
		metadataBase: new URL("https://bisonvoyageur.com"),
	};
}

/**
 * Tag Page component
 */
export default async function TagPage({ params }: TagPageProps) {
	const tag = getTagBySlug((await params).slug);
	if (!tag) {
		notFound();
	}

	const taggedPosts = getPostsByTag(tag.slug);

	return (
		<div className={style.wrapper}>
			<AnimatedTitle className={style.mainTitle} type="h1">
				Tag: {tag.name}
			</AnimatedTitle>
			<PostPreviewList posts={taggedPosts} motionInitialDelay={0.1} />
		</div>
	);
}
