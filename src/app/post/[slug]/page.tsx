import PostContent from "@/components/PostUi/PostContent/PostContent";
import PostFooter from "@/components/PostUi/PostFooter/PostFooter";
import PostHeader from "@/components/PostUi/PostHeader/PostHeader";
import TagList from "@/components/TagsUi/TagList/TagList";
import { getAllPosts, getPostBySlug } from "@/content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import style from "./page.module.css";

type PostPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

/**
 * Only the posts of content/ exist: every page is generated at build time
 */
export const dynamicParams = false;

/**
 * Generate the static params for the post pages, used for the static generation
 */
export function generateStaticParams() {
	return getAllPosts().map((post) => ({ slug: post.slug }));
}

/**
 * Generate the metadata for the post pages
 */
export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const post = getPostBySlug((await params).slug);
	if (!post) {
		notFound();
	}

	return {
		title: `${post.title} | Bison Voyageur`,
		description: post.summary,
		openGraph: {
			images: [`https://bisonvoyageur.com${post.mainPicture.src}`],
		},
		metadataBase: new URL("https://bisonvoyageur.com"),
	};
}

/**
 * Post Page component
 */
export default async function PostPage({ params }: PostPageProps) {
	const post = getPostBySlug((await params).slug);
	if (!post) {
		notFound();
	}

	const allPosts = getAllPosts("asc");

	return (
		<article className={style.wrapper}>
			<PostHeader post={post} className={style.header} />
			{post.tags.length > 0 && <TagList tags={post.tags} />}
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
