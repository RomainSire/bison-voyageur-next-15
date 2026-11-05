"use client";
import { PostType } from "@/Types/PostType";
import { Asset, AssetDetails, Entry } from "contentful";
import { motion } from "motion/react";
import Image from "next/image";
import style from "./PostHeader.module.css";

type PostHeaderProps = {
	post: Entry<PostType, undefined, string>;
	className?: string;
	motionInitialDelay?: number;
};

const MotionImage = motion.create(Image);

export default function PostHeader({
	post,
	className,
	motionInitialDelay = 0,
}: PostHeaderProps) {
	const featuredImage = post.fields.featuredImage as Asset;
	const featuredImageTitle = featuredImage.fields.title as string;
	const featuredImageDetails = featuredImage.fields.file
		?.details as AssetDetails;

	return (
		<header className={`${style.wrapper} ${className ?? ""}`}>
			<MotionImage
				src={`https:${featuredImage.fields.file?.url}`}
				alt={featuredImageTitle ?? ""}
				width={featuredImageDetails.image?.width ?? undefined}
				height={featuredImageDetails.image?.height ?? undefined}
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
				{post.fields.title}
			</motion.h1>
		</header>
	);
}
