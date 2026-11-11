import PostPreview from "@/components/PostPreviewUi/PostPreview/PostPreview";
import type { PostPreview as PostPreviewType } from "@/content";
import style from "./PostFooter.module.css";

type PrevNextPostProps = Readonly<{
	currentPost: PostPreviewType;
	allPosts: PostPreviewType[];
	className?: string;
}>;

export default function PostFooter({
	currentPost,
	allPosts,
	className,
}: PrevNextPostProps) {
	const currentPostIndex = allPosts.findIndex((post) => {
		return post.slug === currentPost.slug;
	});

	if (currentPostIndex === -1) {
		return null;
	}

	const nextPostIndex =
		currentPostIndex === allPosts.length - 1 ? null : currentPostIndex + 1;
	const previousPostIndex =
		currentPostIndex === 0 ? null : currentPostIndex - 1;

	return (
		<footer className={`${style.wrapper} ${className ?? ""}`}>
			{previousPostIndex !== null && (
				<PostPreview
					className={`${style.postPreview} ${style.previous}`}
					post={allPosts[previousPostIndex]}
					motionInitialX={-100}
					motionInitialDelay={0.3}
				>
					<div className={style.indicator}>Précédemment...</div>
				</PostPreview>
			)}
			{nextPostIndex !== null && (
				<PostPreview
					className={`${style.postPreview}  ${style.next}`}
					post={allPosts[nextPostIndex]}
					motionInitialX={100}
					motionInitialDelay={0.4}
				>
					<div className={style.indicator}>À suivre...</div>
				</PostPreview>
			)}
		</footer>
	);
}
