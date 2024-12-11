import { getPostsByTag } from "@/actions/postsActions";

type TagPageProps = {
	params: Promise<{
		tag: string;
	}>;
};

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
