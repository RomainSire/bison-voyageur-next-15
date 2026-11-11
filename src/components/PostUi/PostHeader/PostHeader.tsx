"use client";
import type { PostPreview } from "@/content";
import { motion } from "motion/react";
import Image from "next/image";
import style from "./PostHeader.module.css";

type PostHeaderProps = {
	post: PostPreview;
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
		<header className={`${style.wrapper} ${className ?? ""}`}>
			<MotionImage
				src={post.mainPicture.src}
				alt={post.mainPicture.caption}
				width={post.mainPicture.width}
				height={post.mainPicture.height}
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
		</header>
	);
}
