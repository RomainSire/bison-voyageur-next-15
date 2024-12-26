"use client";
import directus from "@/lib/directus";
import { PostSchema } from "@/Schemas/PostSchema";
import { motion } from "motion/react";
import Image from "next/image";
import style from "./PostHeader.module.css";

type PostHeaderProps = {
	post: PostSchema;
	className?: string;
	motionInitialDelay?: number;
};

const MotionImage = motion.create(Image);

export default function PostHeader({
	post,
	className,
	motionInitialDelay = 0,
}: PostHeaderProps) {
	return (
		<div className={`${style.wrapper} ${className ?? ""}`}>
			<MotionImage
				src={`${directus.url}assets/${post.mainPicture.filename_disk}`}
				alt={post.mainPictureAlt}
				width={post.mainPicture.width ?? undefined}
				height={post.mainPicture.height ?? undefined}
				className={style.image}
				initial={{ x: -15, opacity: 0 }}
				animate={{
					x: 0,
					opacity: 1,
					transition: { delay: motionInitialDelay },
				}}
			/>
			<motion.h1
				className={style.title}
				initial={{ opacity: 0, rotate: -45, y: -10 }}
				animate={{
					opacity: 1,
					rotate: 0,
					y: 0,
					transition: {
						delay: motionInitialDelay,
						type: "spring",
						stiffness: 500,
						damping: 15,
					},
				}}
			>
				{post.title}
			</motion.h1>
		</div>
	);
}
