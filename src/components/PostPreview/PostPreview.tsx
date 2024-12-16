"use client";
import directus from "@/lib/directus";
import { PostSchemaLight } from "@/Schemas/PostSchema";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import FormatedDate from "../FormatedDate/FormatedDate";
import style from "./PostPreview.module.css";

type PostPreviewProps = {
	post: PostSchemaLight;
};

const MotionLink = motion.create(Link);

export default function PostPreview({ post }: PostPreviewProps) {
	// random angle between -3 and 3
	const angle = Math.random() * 6 - 3;

	return (
		<MotionLink
			href={`/post/${post.slug}`}
			className={style.link}
			whileHover={{ scale: 1.03, rotate: 0 }}
			whileTap={{ scale: 0.95 }}
			animate={{ rotate: angle }}
		>
			<article>
				<Image
					src={`${directus.url}assets/${post.mainPicture.filename_disk}`}
					alt={post.mainPicture.title ?? ""}
					width={post.mainPicture.width ?? undefined}
					height={post.mainPicture.height ?? undefined}
					className={style.cardImage}
				/>
				<h2 className={style.cardTitle}>{post.title}</h2>
				<FormatedDate date={post.date} className={style.cardDate} />
			</article>
		</MotionLink>
	);
}
