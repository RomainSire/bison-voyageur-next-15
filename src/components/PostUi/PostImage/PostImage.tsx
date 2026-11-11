"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { usePostGallery } from "../PostGallery/PostGallery";
import style from "./PostImage.module.css";

type PostImageProps = {
	/** Path written in the Markdown, relative to public/pictures/. */
	src: string;
};

/**
 * A photo of the post text. Size and caption come from the post pictures.
 */
export default function PostImage({ src }: PostImageProps) {
	const { pictures, openGallery } = usePostGallery();
	// The Markdown renderer percent-encodes URLs; post pictures keep the raw path.
	const path = `/pictures/${decodeURI(src)}`;
	const index = pictures.findIndex((p) => p.src === path);
	const picture = pictures[index];
	if (!picture) {
		throw new Error(`Picture not found in the post pictures: ${src}`);
	}

	return (
		<motion.button
			className={style.button}
			type="button"
			whileHover={{ scale: 1.03, y: -5 }}
			whileTap={{ scale: 0.98 }}
			onClick={() => openGallery(index)}
		>
			<Image
				src={picture.src}
				alt={picture.caption}
				width={picture.width}
				height={picture.height}
				className={style.image}
			/>
		</motion.button>
	);
}
