"use client";
import FormatedDate from "@/components/FormatedDate/FormatedDate";
import { PostTypeLight } from "@/Types/PostType";
import { Asset, AssetDetails, Entry } from "contentful";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import style from "./PostPreview.module.css";

type PostPreviewProps = {
	post: Entry<PostTypeLight, undefined, string>;
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
	const thumbnail = post.fields.thumbnail as Asset;
	const thumbnailTitle = thumbnail.fields.title as string;
	const thumbnailDetails = thumbnail.fields.file?.details as AssetDetails;

	useEffect(() => {
		// random angle between -3 and 3
		setAngle(Math.random() * 10 - 3);
	}, []);

	return (
		<MotionLink
			href={`/post/${post.fields.slug}`}
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
					src={`https:${thumbnail.fields.file?.url}`}
					alt={thumbnailTitle ?? ""}
					width={thumbnailDetails.image?.width ?? 300}
					height={thumbnailDetails.image?.height ?? 300}
					className={style.cardImage}
				/>
				<h2 className={style.cardTitle}>{post.fields.title}</h2>
				<FormatedDate date={post.fields.date} className={style.cardDate} />
				{children}
			</article>
		</MotionLink>
	);
}
