"use client";
import { PostSchemaLight } from "@/Schemas/PostSchema";
import PostPreview from "../PostPreview/PostPreview";
import style from "./PostPreviewList.module.css";

type PostPreviewListProps = {
	posts: PostSchemaLight[];
	motionInitialDelay?: number;
};

export default function PostPreviewList({
	posts,
	motionInitialDelay = 0,
}: PostPreviewListProps) {
	return (
		<nav className={style.section}>
			<ul className={style.list}>
				{posts.map((post, index) => {
					const motionInitialX = index % 2 === 0 ? -100 : 100;
					const selfDelay = (index + 1) * 0.1 + motionInitialDelay;
					return (
						<li className={style.postWrapper} key={post.slug}>
							<PostPreview
								post={post}
								className={style.post}
								motionInitialX={motionInitialX}
								motionInitialDelay={selfDelay}
							/>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
