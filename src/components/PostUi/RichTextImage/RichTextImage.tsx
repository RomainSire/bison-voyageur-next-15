"use client";

import { Asset, AssetDetails } from "contentful";
import { motion } from "motion/react";
import Image from "next/image";
import style from "./RichTextImage.module.css";

type PostImageProps = {
	image: Asset;
	onImageClick?: (image: Asset) => void;
};

export default function RichTextImage({ image, onImageClick }: PostImageProps) {
	const imageTitle = image.fields.title as string;
	const imageDetails = image.fields.file?.details as AssetDetails;
	return (
		<motion.button
			className={style.button}
			type="button"
			whileHover={{ scale: 1.03, y: -5 }}
			whileTap={{ scale: 0.98 }}
			onClick={onImageClick ? () => onImageClick(image) : undefined}
		>
			<Image
				src={`https:${image.fields.file?.url}`}
				alt={imageTitle ?? ""}
				width={imageDetails.image?.width ?? undefined}
				height={imageDetails.image?.height ?? undefined}
				className={style.image}
			/>
		</motion.button>
	);
}
