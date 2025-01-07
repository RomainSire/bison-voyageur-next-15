/**
 * Wraps a value between a minimum and maximum value.
 */
export function wrap(min: number, max: number, value: number) {
	const range = max - min;
	return ((((value - min) % range) + range) % range) + min;
}
