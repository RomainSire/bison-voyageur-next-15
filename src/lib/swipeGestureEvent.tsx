/**
 * Configuration for swipe gesture
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

/**
 * Handle horizontal swipe gesture
 * @returns 1 for swipe right, -1 for swipe left, 0 for no swipe
 */
export function handleHorizontalSwipe(
	e: MouseEvent | TouchEvent | PointerEvent,
	{
		offset,
		velocity,
	}: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
) {
	const swipe = swipePower(offset.x, velocity.x);
	if (swipe < -swipeConfidenceThreshold) {
		return 1;
	} else if (swipe > swipeConfidenceThreshold) {
		return -1;
	}
	return 0;
}

/**
 * Handle vertical swipe gesture
 * @returns 1 for swipe up, -1 for swipe down, 0 for no swipe
 */
export function handleVerticalSwipe(
	e: MouseEvent | TouchEvent | PointerEvent,
	{
		offset,
		velocity,
	}: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
) {
	const swipe = swipePower(offset.y, velocity.y);
	if (swipe < -swipeConfidenceThreshold) {
		return 1;
	} else if (swipe > swipeConfidenceThreshold) {
		return -1;
	}
	return 0;
}
