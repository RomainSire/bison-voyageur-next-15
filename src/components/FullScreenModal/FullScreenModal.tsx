import {
	clearAllBodyScrollLocks,
	disableBodyScroll,
	enableBodyScroll,
} from "@/lib/bodyScrollLock/bodyScrollLock";
import { handleVerticalSwipe } from "@/lib/swipeGestureHelper/swipeGestureHelper";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useEffect, useRef } from "react";
import style from "./FullScreenModal.module.css";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	accessibilityTitle: string;
};

export default function FullScreenModal({
	isOpen,
	onClose,
	children,
	accessibilityTitle,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	// Using a ref for isOpenRef, because for some reason, onAnimationComplete function is called with an old version of isOpen. With a ref, the isOpen state is up to date in the onAnimationComplete function.
	const isOpenRef = useRef(isOpen);
	const triggerRef = useRef<HTMLElement | null>(null);

	/**
	 * Handle the dialog opening and closing
	 */
	useEffect(() => {
		isOpenRef.current = isOpen;
		const dialog = dialogRef.current;
		if (dialog) {
			if (isOpen) {
				disableBodyScroll(dialog);
				dialog.showModal();
				triggerRef.current = document.activeElement as HTMLElement;
				dialog.focus();
			} else {
				enableBodyScroll(dialog);
				triggerRef.current?.focus();
			}
		}
		return () => {
			clearAllBodyScrollLocks();
		};
	}, [isOpen]);

	return (
		<dialog
			className={style.dialog}
			ref={dialogRef}
			onClose={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="full-screen-modal-title"
			aria-describedby="full-screen-modal-description"
			tabIndex={-1}
		>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={style.drawer}
						initial={{ opacity: 0, y: 300 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 300 }}
						transition={{ duration: 0.2 }}
						key="fullScreenModalDrawer"
						onAnimationComplete={() => {
							if (!isOpenRef.current && dialogRef.current) {
								dialogRef.current.close();
							}
						}}
						drag="y"
						dragConstraints={{ top: 0, bottom: 0 }}
						dragElastic={1}
						onDragEnd={(e, { offset, velocity }) => {
							const swipeY = handleVerticalSwipe(e, { offset, velocity });
							if (swipeY === -1) {
								onClose();
								dialogRef.current?.close();
							}
						}}
					>
						<h2 id="full-screen-modal-title" className="visuallyHidden">
							{accessibilityTitle}
						</h2>
						<div
							id="full-screen-modal-description"
							className={style.description}
						>
							{children}
						</div>
						<motion.button
							className={style.closeButton}
							onClick={onClose}
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.3, rotate: 90 }}
							aria-label="Fermer la modale"
						>
							{/* Close button */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								fill="currentColor"
								viewBox="0 0 256 256"
							>
								<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
							</svg>
						</motion.button>
					</motion.div>
				)}
			</AnimatePresence>
		</dialog>
	);
}
