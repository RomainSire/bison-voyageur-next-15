import { getAllPosts, getPostBySlug } from "@/actions/postsActions";
import PostContent from "@/components/PostUi/PostContent/PostContent";
import PostHeader from "@/components/PostUi/PostHeader/PostHeader";
import { REVALIDATE_TIME } from "@/publicConfig";
import style from "./page.module.css";

type PostPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

/**
 * Revalidate time in seconds
 */
export const revalidate = REVALIDATE_TIME;

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

	return (
		<div className={style.wrapper}>
			<PostHeader post={post} className={style.header} />
			<PostContent
				post={post}
				className={style.content}
				motionInitialDelay={0.2}
			/>
		</div>
	);
}
