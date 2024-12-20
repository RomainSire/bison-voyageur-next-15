"use client";
import { PostSchemaLight } from "@/Schemas/PostSchema";
import PostPreview from "../PostPreview/PostPreview";
import style from "./PostPreviewList.module.css";

type PostPreviewListProps = {
	posts: PostSchemaLight[];
};

export default function PostPreviewList({ posts }: PostPreviewListProps) {
	return (
		<nav className={style.section}>
			<ul className={style.list}>
				{posts.map((post, index) => {
					const motionInitialX = index % 2 === 0 ? -100 : 100;
					const motionInitialDelay = (index + 1) * 0.1;
					return (
						<li className={style.postWrapper} key={post.slug}>
							<PostPreview
								post={post}
								className={style.post}
								motionInitialX={motionInitialX}
								motionInitialDelay={motionInitialDelay}
							/>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
