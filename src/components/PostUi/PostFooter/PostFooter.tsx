import PostPreview from "@/components/PostPreviewUi/PostPreview/PostPreview";
import type { PostSchema, PostSchemaLight } from "@/Schemas/PostSchema";
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
				<PostPreview
					className={`${style.postPreview} ${style.previous}`}
					post={sortedPost[previousPostIndex]}
					motionInitialX={-100}
					motionInitialDelay={0.3}
				>
					<div className={style.indicator}>Précédemment...</div>
				</PostPreview>
			)}
			{nextPostIndex !== null && (
				<PostPreview
					className={`${style.postPreview}  ${style.next}`}
					post={sortedPost[nextPostIndex]}
					motionInitialX={100}
					motionInitialDelay={0.4}
				>
					<div className={style.indicator}>À suivre...</div>
				</PostPreview>
			)}
		</footer>
	);
}
