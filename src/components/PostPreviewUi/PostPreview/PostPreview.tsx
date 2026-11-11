"use client";
import FormatedDate from "@/components/FormatedDate/FormatedDate";
import type { PostPreview as PostPreviewType } from "@/content";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import style from "./PostPreview.module.css";

type PostPreviewProps = {
	post: PostPreviewType;
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
		// eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: random value must be set client-side to avoid hydration mismatch
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
					src={post.mainPicture.src}
					alt={post.mainPicture.caption}
					width={post.mainPicture.width}
					height={post.mainPicture.height}
					className={style.cardImage}
				/>
				<h2 className={style.cardTitle}>{post.title}</h2>
				<FormatedDate date={post.date} className={style.cardDate} />
				{children}
			</article>
		</MotionLink>
	);
}
