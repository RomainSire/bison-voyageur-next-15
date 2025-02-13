import PostContent from "@/components/PostUi/PostContent/PostContent";
import PostFooter from "@/components/PostUi/PostFooter/PostFooter";
import PostHeader from "@/components/PostUi/PostHeader/PostHeader";
import TagList from "@/components/TagsUi/TagList/TagList";
import { REVALIDATE_TIME } from "@/publicConfig";
import { getAllPosts, getPostBySlug } from "@/services/postService";
import { TagType } from "@/Types/TagType";
import { Entry } from "contentful";
import { notFound } from "next/navigation";
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
		slug: post.fields.slug,
	}));
}

/**
 * Post Page component
 */
export default async function PostPage({ params }: PostPageProps) {
	const slug = (await params).slug;
	const post = await getPostBySlug(slug);
	const postTags = post.fields.tags as Entry<TagType, undefined, string>[];

	if (!post) {
		notFound();
	}

	const allPosts = await getAllPosts("asc");

	return (
		<article className={style.wrapper}>
			<PostHeader post={post} className={style.header} />
			{postTags.length > 0 && <TagList tags={postTags} />}
			<PostContent
				post={post}
				className={style.content}
				motionInitialDelay={0.2}
			/>
			<PostFooter
				className={style.footer}
				allPosts={allPosts}
				currentPost={post}
			/>
		</article>
	);
}
