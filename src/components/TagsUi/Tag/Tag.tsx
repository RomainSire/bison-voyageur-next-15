"use client";
import { motion } from "motion/react";
import Link from "next/link";
import style from "./Tag.module.css";

type TagProps = {
	tag: string;
	motionInitialDelay?: number;
};

const MotionLink = motion.create(Link);

export default function Tag({ tag, motionInitialDelay = 0 }: TagProps) {
	const hoverTransition = { type: "spring", stiffness: 500, damping: 15 };
	const entryTransition = { delay: motionInitialDelay };
	return (
		<MotionLink
			href={`/tag/${encodeURIComponent(tag)}`}
			className={style.tag}
			whileHover={{ scale: 1.1, y: -2, transition: hoverTransition }}
			whileTap={{ scale: 1.05, transition: hoverTransition }}
			transition={{ type: "spring", stiffness: 500, damping: 15 }}
			initial={{ x: -20, opacity: 0 }}
			animate={{
				x: 0,
				opacity: 1,
				transition: entryTransition,
			}}
		>
			{tag}
		</MotionLink>
	);
}
