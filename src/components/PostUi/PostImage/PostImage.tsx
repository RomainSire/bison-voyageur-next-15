"use client";

import { motion } from "motion/react";
import Image from "next/image";
import style from "./PostImage.module.css";

type PostImageProps = {
	src: string;
	alt: string;
};

const MotionImage = motion.create(Image);

export default function PostImage({ src, alt }: PostImageProps) {
	return (
		<MotionImage
			className={style.image}
			src={src}
			alt={alt}
			width={500}
			height={500}
			whileHover={{ scale: 1.03, y: -5 }}
			whileTap={{ scale: 0.98 }}
		/>
	);
}
