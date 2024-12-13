import { getAllTags, getPostsByTag } from "@/actions/postsActions";
import { REVALIDATE_TIME } from "@/publicConfig";

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
	const posts = await getPostsByTag(decodedTag);
	console.log({ tag, posts });

	return (
		<div>
			<h1>{decodedTag}</h1>
			{posts.map((post) => (
				<article key={post.slug}>
					<h2>{post.title}</h2>
					<p>{post.date}</p>
				</article>
			))}
		</div>
	);
}
