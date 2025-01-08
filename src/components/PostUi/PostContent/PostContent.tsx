"use client";
import FormatedDate from "@/components/FormatedDate/FormatedDate";
import FullScreenModal from "@/components/FullScreenModal/FullScreenModal";
import ImagesGallery from "@/components/ImagesGallery/ImagesGallery";
import { getAllImagesFromMarkdown } from "@/lib/postHelper/postHelper";
import { PostSchema } from "@/Schemas/PostSchema";
import { motion } from "motion/react";
import { useState } from "react";
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageIndex, setCurrentImageIndex] = useState(0);

	// Extract all images from the markdown content
	const allImages = getAllImagesFromMarkdown(post.content);

	// Handle image click
	const handleImageClick = (image: { src: string; alt: string }) => {
		const imageIndex =
			allImages?.findIndex((img) => img.src === image.src) ?? 0;
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
			<FormatedDate date={post.date} className={style.date} />
			<MarkdownParser markdown={post.content} onImageClick={handleImageClick} />
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
