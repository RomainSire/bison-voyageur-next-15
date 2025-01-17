"use client";

import { motion } from "motion/react";
import { createElement } from "react";

type AnimatedTitleProps = Readonly<{
	children: string | string[] | number | number[];
	type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	motionInitialDelay?: number;
	className?: string;
}>;

export default function AnimatedTitle({
	type,
	motionInitialDelay = 0,
	children,
	className,
}: AnimatedTitleProps) {
	return (
		<motion.div
			initial={{ x: -100, opacity: 0 }}
			animate={{
				x: 0,
				opacity: 1,
				transition: { delay: motionInitialDelay },
			}}
		>
			{createElement(
				type,
				{
					className,
				},
				children,
			)}
		</motion.div>
	);
}
