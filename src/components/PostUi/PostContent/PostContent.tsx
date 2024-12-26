"use client";
import FormatedDate from "@/components/FormatedDate/FormatedDate";
import { PostSchema } from "@/Schemas/PostSchema";
import { motion } from "motion/react";
import MarkdownParser from "../MarkdownParser/MarkdownParser";
import style from "./PostContent.module.css";

type PostContentProps = {
	post: PostSchema;
	className?: string;
	motionInitialDelay?: number;
};

export default function PostContent({
	post,
	className,
	motionInitialDelay = 0,
}: PostContentProps) {
	return (
		<motion.div
			className={`${style.content} ${className ?? ""}`}
			initial={{ y: 30, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				transition: { delay: motionInitialDelay },
			}}
		>
			<FormatedDate date={post.date} className={style.date} />
			<MarkdownParser markdown={post.content} />
		</motion.div>
	);
}
