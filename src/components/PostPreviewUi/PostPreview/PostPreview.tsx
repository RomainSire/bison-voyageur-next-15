"use client";
import directus from "@/lib/directusSDK/directus";
import { PostSchemaLight } from "@/Schemas/PostSchema";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import FormatedDate from "../../FormatedDate/FormatedDate";
import style from "./PostPreview.module.css";

type PostPreviewProps = {
	post: PostSchemaLight;
	className?: string;
	motionInitialX?: number;
	motionInitialDelay?: number;
	children?: ReactNode;
};

const MotionLink = motion.create(Link);

export default function PostPreview({
	post,
	className,
	motionInitialX = 0,
	motionInitialDelay = 0,
	children,
}: PostPreviewProps) {
	const [angle, setAngle] = useState(0);

	useEffect(() => {
		// random angle between -3 and 3
		setAngle(Math.random() * 10 - 3);
	}, []);

	return (
		<MotionLink
			href={`/post/${post.slug}`}
			className={`${style.link} ${className ?? ""}`}
			whileHover={{ scale: 1.03, rotate: 0 }}
			whileTap={{ scale: 0.95 }}
			initial={{ x: motionInitialX, opacity: 0, rotate: -15 }}
			animate={{
				x: 0,
				opacity: 1,
				rotate: angle,
				transition: { delay: motionInitialDelay },
			}}
		>
			<article>
				<Image
					src={`${directus.url}assets/${post.mainPicture.filename_disk}`}
					alt={post.mainPictureAlt}
					width={post.mainPicture.width ?? undefined}
					height={post.mainPicture.height ?? undefined}
					className={style.cardImage}
				/>
				<h2 className={style.cardTitle}>{post.title}</h2>
				<FormatedDate date={post.date} className={style.cardDate} />
				{children}
			</article>
		</MotionLink>
	);
}
