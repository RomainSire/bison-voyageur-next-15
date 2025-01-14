import type { PostSchema, PostSchemaLight } from "@/Schemas/PostSchema";
import Link from "next/link";
import style from "./PostFooter.module.css";

type PrevNextPostProps = Readonly<{
	currentPost: PostSchema;
	allPosts: PostSchemaLight[];
	className?: string;
}>;

export default function PostFooter({
	currentPost,
	allPosts,
	className,
}: PrevNextPostProps) {
	const sortedPost = allPosts.toSorted((postA, postB) => {
		return new Date(postA.date).getTime() - new Date(postB.date).getTime();
	});
	const currentPostIndex = sortedPost.findIndex((post) => {
		return post.id === currentPost.id;
	});

	if (currentPostIndex === -1) {
		return null;
	}

	const nextPostIndex =
		currentPostIndex === sortedPost.length - 1 ? null : currentPostIndex + 1;
	const previousPostIndex =
		currentPostIndex === 0 ? null : currentPostIndex - 1;

	return (
		<footer className={`${style.wrapper} ${className ?? ""}`}>
			{previousPostIndex !== null && (
				<Link
					className={`${style.card} ${style.previous}`}
					href={`/post/${sortedPost[previousPostIndex].slug}`}
				>
					{sortedPost[previousPostIndex].title}
				</Link>
			)}
			{nextPostIndex !== null && (
				<Link
					className={`${style.card} ${style.next}`}
					href={`/post/${sortedPost[nextPostIndex].slug}`}
				>
					{sortedPost[nextPostIndex].title}
				</Link>
			)}
		</footer>
	);
}
