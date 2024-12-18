import { PostSchemaLight } from "@/Schemas/PostSchema";
import PostPreview from "../PostPreview/PostPreview";
import style from "./PostPreviewList.module.css";

type PostPreviewListProps = {
	posts: PostSchemaLight[];
};

export default function PostPreviewList({ posts }: PostPreviewListProps) {
	return (
		<section className={style.section}>
			{posts.map((post) => {
				return (
					<div className={style.postWrapper} key={post.slug}>
						<PostPreview post={post} />
					</div>
				);
			})}
		</section>
	);
}
