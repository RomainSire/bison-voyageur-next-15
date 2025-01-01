import Image from "next/image";
import { useEffect } from "react";
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
 * - navigation au clavier (lorsqu'on ouvre la modale)
 * - navigation au clavier (next/prev/close)
 * - Accessibilité
 * - Style
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
	// Prevent background scrolling when the modal is open
	useEffect(() => {
		const body = document.body;
		if (isOpen) {
			body.classList.add("no-scroll");
		} else {
			body.classList.remove("no-scroll");
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

	// Render
	if (!isOpen) {
		return null;
	}

	return (
		<div
			className={style.modal}
			aria-modal="true"
			role="dialog"
			aria-labelledby="galleryModalTitle"
		>
			<h2 id="galleryModalTitle" className={style.visuallyHidden}>
				Gallerie de photos
			</h2>
			<div className={style.content}>
				<button className={style.button} onClick={handlePreviousImage}>
					Previous
				</button>
				<Image
					className={style.image}
					src={allImages[imageIndex].src}
					alt={allImages[imageIndex].alt}
					width={2000}
					height={2000}
				/>
				<button className={style.button} onClick={handleNextImage}>
					Next
				</button>
			</div>
			<button onClick={() => setIsOpen(false)}>Close</button>
		</div>
	);
}
