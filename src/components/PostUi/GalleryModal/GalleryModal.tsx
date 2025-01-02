import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import style from "./GalleryModal.module.css";

type GalleryModalProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	imageIndex: number;
	setImageIndex: (imageIndex: number) => void;
	allImages: { src: string; alt: string }[];
};

/**
 * TODO:
 * - Animation
 * - Tests
 */
export default function GalleryModal({
	isOpen,
	setIsOpen,
	imageIndex,
	setImageIndex,
	allImages,
}: GalleryModalProps) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const [lastClickedImageId, setLastClickedImageId] = useState<string>("");

	useEffect(() => {
		if (isOpen) {
			// Prevent background scrolling when the modal is open
			document.body.style.position = "fixed";
			document.body.style.top = `-${window.scrollY}px`;

			// Get the last clicked Image id
			setLastClickedImageId(allImages[imageIndex].src.split("/assets/")[1]);
			// Focus the modal
			dialogRef.current?.focus();
		} else {
			// Restore the scroll
			const scrollY = document.body.style.top;
			document.body.style.position = "";
			document.body.style.top = "";
			window.scrollTo(0, parseInt(scrollY || "0") * -1);

			// Restore the focus to the last clicked image
			const postContentElement = document.getElementById("post-content");
			const allImagesElements =
				postContentElement?.querySelectorAll<HTMLImageElement>("img");
			if (!allImagesElements) return;
			const lastClickedImageElement = [...allImagesElements].find((img) =>
				img.src.includes(lastClickedImageId),
			);
			lastClickedImageElement?.closest("button")?.focus();
		}
	}, [isOpen]);

	// Handle next image
	const handleNextImage = () => {
		if (imageIndex === allImages.length - 1) {
			return setImageIndex(0);
		}
		setImageIndex(imageIndex + 1);
	};
	// Handle previous image
	const handlePreviousImage = () => {
		if (imageIndex === 0) {
			return setImageIndex(allImages.length - 1);
		}
		setImageIndex(imageIndex - 1);
	};

	// Handle keydown events for accessibility
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape") {
			setIsOpen(false);
		} else if (event.key === "ArrowRight") {
			handleNextImage();
		} else if (event.key === "ArrowLeft") {
			handlePreviousImage();
		}
	};

	// Case: modal is closed
	if (!isOpen) {
		return null;
	}

	// calculate index of the next and previous image
	const nextImageIndex =
		imageIndex === allImages.length - 1 ? 0 : imageIndex + 1;
	const previousImageIndex =
		imageIndex === 0 ? allImages.length - 1 : imageIndex - 1;

	// Render modal
	return (
		<div
			className={style.modal}
			aria-modal="true"
			role="dialog"
			aria-labelledby="galleryModalTitle"
			aria-live="polite"
			tabIndex={-1}
			ref={dialogRef}
			onKeyDown={handleKeyDown}
		>
			<h2 id="galleryModalTitle" className={style.visuallyHidden}>
				Gallerie de photos
			</h2>
			<button
				className={`${style.button} ${style.previous}`}
				onClick={handlePreviousImage}
				aria-label="Image précédente"
			>
				{/* PREVIOUS */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					viewBox="0 0 256 256"
				>
					<path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
				</svg>
			</button>
			<Image
				className={style.image}
				src={allImages[imageIndex].src}
				alt={allImages[imageIndex].alt}
				width={2000}
				height={2000}
				loading="eager"
			/>
			<button
				className={`${style.button} ${style.next}`}
				onClick={handleNextImage}
				aria-label="Image suivante"
			>
				{/* NEXT */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					viewBox="0 0 256 256"
				>
					<path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
				</svg>
			</button>
			<button
				className={`${style.button} ${style.close}`}
				onClick={() => setIsOpen(false)}
				aria-label="Fermer la gallerie"
			>
				{/* CLOSE */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					viewBox="0 0 256 256"
				>
					<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
				</svg>
			</button>

			{/* Pre-load next and previous images for smooth transitions */}
			<Image
				className={style.visuallyHidden}
				src={allImages[nextImageIndex].src}
				alt={allImages[nextImageIndex].alt}
				width={2000}
				height={2000}
				loading="eager"
			/>
			<Image
				className={style.visuallyHidden}
				src={allImages[previousImageIndex].src}
				alt={allImages[previousImageIndex].alt}
				width={2000}
				height={2000}
				loading="eager"
			/>
		</div>
	);
}
