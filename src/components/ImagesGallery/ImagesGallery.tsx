import { handleHorizontalSwipe } from "@/lib/swipeGestureHelper/swipeGestureHelper";
import { wrap } from "@/lib/wrap/wrap";
import { Asset, AssetDetails } from "contentful";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import style from "./ImageGallery.module.css";

type ImagesGalleryProps = {
	allImages: Asset[];
	startIndex: number;
};

const MotionImage = motion.create(Image);

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

export default function ImagesGallery({
	allImages,
	startIndex,
}: ImagesGalleryProps) {
	const [[page, direction], setPage] = useState([startIndex, 0]);

	const imageIndex = wrap(0, allImages.length, page);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	// calculate index of the next and previous image
	const nextImageIndex =
		imageIndex === allImages.length - 1 ? 0 : imageIndex + 1;
	const previousImageIndex =
		imageIndex === 0 ? allImages.length - 1 : imageIndex - 1;

	// Create some useful variables
	const currentImage = allImages[imageIndex];
	const currentImageTitle = currentImage.fields.title as string;
	const currentImageDetails = currentImage.fields.file?.details as AssetDetails;

	const nextImage = allImages[nextImageIndex];
	const nextImageTitle = nextImage.fields.title as string;
	const nextImageDetails = nextImage.fields.file?.details as AssetDetails;

	const previousImage = allImages[previousImageIndex];
	const previousImageTitle = previousImage.fields.title as string;
	const previousImageDetails = previousImage.fields.file
		?.details as AssetDetails;

	return (
		<>
			<AnimatePresence initial={false} custom={direction}>
				<MotionImage
					className={style.image}
					key={page}
					src={`https:${currentImage.fields.file?.url}`}
					alt={currentImageTitle ?? ""}
					width={currentImageDetails.image?.width ?? undefined}
					height={currentImageDetails.image?.height ?? undefined}
					loading="eager"
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					onDragEnd={(e, { offset, velocity }) => {
						const swipeX = handleHorizontalSwipe(e, { offset, velocity });
						paginate(swipeX);
					}}
					role="img"
					aria-label={`Image ${imageIndex + 1} sur ${allImages.length}`}
				/>
			</AnimatePresence>
			<motion.button
				className={`${style.button} ${style.next}`}
				onClick={() => paginate(1)}
				aria-label="Image suivante"
				whileHover={{ scale: 1.3 }}
				whileTap={{ scale: 0.9 }}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					viewBox="0 0 256 256"
				>
					<path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
				</svg>
			</motion.button>
			<motion.button
				className={`${style.button} ${style.previous}`}
				onClick={() => paginate(-1)}
				aria-label="Image précédente"
				whileHover={{ scale: 1.3 }}
				whileTap={{ scale: 0.9 }}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					viewBox="0 0 256 256"
				>
					<path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
				</svg>
			</motion.button>
			{/* Pagination */}
			<div className={style.pagination}>
				{allImages.map((_, index) => (
					<motion.button
						key={index}
						className={`${style.dot} ${
							index === imageIndex ? style.active : ""
						}`}
						onClick={() => {
							setPage([index, index < imageIndex ? -1 : 1]);
						}}
						whileTap={{ scale: 0.9 }}
						aria-label={`Aller à l'image ${index + 1}`}
					/>
				))}
			</div>
			{/* Pre-load next and previous images for smooth transitions */}
			<Image
				className="visuallyHidden"
				src={`https:${nextImage.fields.file?.url}`}
				alt={nextImageTitle || ""}
				width={nextImageDetails.image?.width ?? undefined}
				height={nextImageDetails.image?.height ?? undefined}
				loading="eager"
				key={`https:${nextImage.fields.file?.url}`}
			/>
			<Image
				className="visuallyHidden"
				src={`https:${previousImage.fields.file?.url}`}
				alt={previousImageTitle || ""}
				width={previousImageDetails.image?.width ?? undefined}
				height={previousImageDetails.image?.height ?? undefined}
				loading="eager"
				key={`https:${previousImage.fields.file?.url}`}
			/>
		</>
	);
}
