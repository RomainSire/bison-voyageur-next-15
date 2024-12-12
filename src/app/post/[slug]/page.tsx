import { getAllPosts, getPostBySlug } from "@/actions/postsActions";
import ParseMarkdown from "@/components/ParseMarkdown/ParseMarkdown";

type PostPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

/**
 * Revalidate time in seconds
 */
export const revalidate = 3600; // 1 hours

/**
 * Generate the static params for the post pages, used for the static generation
 */
export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

/**
 * Post Page component
 */
export default async function PostPage({ params }: PostPageProps) {
	const slug = (await params).slug;
	const post = await getPostBySlug(slug);

	console.log({ post });

	return (
		<div>
			<h1>{post.title}</h1>
			<ParseMarkdown markdown={post.content} />
		</div>
	);
}
