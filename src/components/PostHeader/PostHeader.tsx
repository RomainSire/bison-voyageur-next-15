import directus from "@/lib/directus";
import { PostSchema } from "@/Schemas/PostSchema";
import Image from "next/image";
import style from "./PostHeader.module.css";

type PostHeaderProps = {
	post: PostSchema;
	className?: string;
};

export default function PostHeader({ post, className }: PostHeaderProps) {
	return (
		<div className={`${style.wrapper} ${className ?? ""}`}>
			<Image
				src={`${directus.url}assets/${post.mainPicture.filename_disk}`}
				alt={post.mainPictureAlt}
				width={post.mainPicture.width ?? undefined}
				height={post.mainPicture.height ?? undefined}
				className={style.image}
			/>
			<h1 className={style.title}>{post.title}</h1>
		</div>
	);
}
