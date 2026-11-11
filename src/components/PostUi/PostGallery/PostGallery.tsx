"use client";
import FullScreenModal from "@/components/FullScreenModal/FullScreenModal";
import ImagesGallery from "@/components/ImagesGallery/ImagesGallery";
import type { Picture } from "@/content";
import { motion } from "motion/react";
import { createContext, ReactNode, useContext, useState } from "react";

type PostGalleryContextValue = {
	pictures: Picture[];
	openGallery: (index: number) => void;
};

const PostGalleryContext = createContext<PostGalleryContextValue>({
	pictures: [],
	openGallery: () => {},
});

/** Pictures of the post and the function opening the gallery at one of them. */
export const usePostGallery = () => useContext(PostGalleryContext);

type PostGalleryProps = {
	pictures: Picture[];
	className?: string;
	motionInitialDelay?: number;
	children: ReactNode;
};

/**
 * Block of the post content: holds the gallery state (FullScreenModal +
 * ImagesGallery on the post pictures) for the images rendered inside it.
 */
export default function PostGallery({
	pictures,
	className,
	motionInitialDelay = 0,
	children,
}: PostGalleryProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageIndex, setImageIndex] = useState(0);

	const openGallery = (index: number) => {
		setImageIndex(index);
		setIsModalOpen(true);
	};

	return (
		<PostGalleryContext.Provider value={{ pictures, openGallery }}>
			<motion.div
				className={className}
				initial={{ y: 30, opacity: 0 }}
				animate={{
					y: 0,
					opacity: 1,
					transition: { delay: motionInitialDelay },
				}}
				id="post-content"
			>
				{children}
				{pictures.length > 0 && (
					<FullScreenModal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						accessibilityTitle="Gallerie de photos de l'article"
					>
						<ImagesGallery allImages={pictures} startIndex={imageIndex} />
					</FullScreenModal>
				)}
			</motion.div>
		</PostGalleryContext.Provider>
	);
}
