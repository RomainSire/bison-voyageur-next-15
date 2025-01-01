"use client";

import { motion } from "motion/react";
import Image from "next/image";
import style from "./PostImage.module.css";

type PostImageProps = {
	src: string;
	alt: string;
	onImageClick?: (image: { src: string; alt: string }) => void;
};

export default function PostImage({ src, alt, onImageClick }: PostImageProps) {
	return (
		<motion.button
			className={style.button}
			type="button"
			whileHover={{ scale: 1.03, y: -5 }}
			whileTap={{ scale: 0.98 }}
			onClick={onImageClick ? () => onImageClick({ src, alt }) : undefined}
		>
			<Image
				className={style.image}
				src={src}
				alt={alt}
				width={500}
				height={500}
			/>
		</motion.button>
	);
}
