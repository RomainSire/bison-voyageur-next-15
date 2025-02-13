"use client";
import FormatedDate from "@/components/FormatedDate/FormatedDate";
import FullScreenModal from "@/components/FullScreenModal/FullScreenModal";
import ImagesGallery from "@/components/ImagesGallery/ImagesGallery";
import { getAllImagesFromRichText } from "@/lib/postHelper/postHelper";
import { PostType } from "@/Types/PostType";
import { Asset, Entry } from "contentful";
import { motion } from "motion/react";
import { useState } from "react";
import RichTextParser from "../RichTextParser/RichTextParser";
import style from "./PostContent.module.css";

type PostContentProps = {
	post: Entry<PostType, undefined, string>;
	className?: string;
	motionInitialDelay?: number;
};

export default function PostContent({
	post,
	className,
	motionInitialDelay = 0,
}: PostContentProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageIndex, setCurrentImageIndex] = useState(0);

	// Extract all images from the markdown content
	const allImages = getAllImagesFromRichText(post.fields.content);

	// Handle image click
	const handleImageClick = (image: Asset) => {
		const imageIndex =
			allImages?.findIndex((img) => img.sys.id === image.sys.id) ?? 0;
		setCurrentImageIndex(imageIndex);
		setIsModalOpen(true);
	};

	// Render
	return (
		<motion.div
			className={`${style.content} ${className ?? ""}`}
			initial={{ y: 30, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				transition: { delay: motionInitialDelay },
			}}
			id="post-content"
		>
			<FormatedDate date={post.fields.date} className={style.date} />
			<RichTextParser onImageClick={handleImageClick}>
				{post.fields.content}
			</RichTextParser>
			<FullScreenModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				accessibilityTitle="Gallerie de photos de l'article"
			>
				<ImagesGallery allImages={allImages} startIndex={imageIndex} />
			</FullScreenModal>
		</motion.div>
	);
}
