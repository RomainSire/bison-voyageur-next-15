import { getPostBySlug } from "@/actions/postsActions";

type PostPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export default async function PostPage({ params }: PostPageProps) {
	const slug = (await params).slug;
	const post = await getPostBySlug(slug);

	console.log({ post });

	return (
		<div>
			<h1>{post.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.content }}></div>
		</div>
	);
}
