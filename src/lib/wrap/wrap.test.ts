import { wrap } from "./wrap";

describe("wrap function", () => {
	it("should return the value unchanged if it is within the range", () => {
		expect(wrap(0, 100, 50)).toBe(50);
		expect(wrap(-50, 50, 0)).toBe(0);
	});

	it("should wrap around when the value exceeds the max", () => {
		expect(wrap(0, 100, 120)).toBe(20);
		expect(wrap(-50, 50, 60)).toBe(-40);
	});

	it("should wrap around when the value is less than the min", () => {
		expect(wrap(0, 100, -30)).toBe(70);
		expect(wrap(-50, 50, -60)).toBe(40);
	});

	it("should work with non-zero ranges", () => {
		expect(wrap(10, 20, 25)).toBe(15);
		expect(wrap(10, 20, 5)).toBe(15);
	});

	it("should handle large positive values", () => {
		expect(wrap(0, 100, 1020)).toBe(20);
		expect(wrap(-100, 0, 990)).toBe(-10);
	});

	it("should handle large negative values", () => {
		expect(wrap(0, 100, -1020)).toBe(80);
		expect(wrap(-100, 0, -990)).toBe(-90);
	});

	it("should return min when value equals max", () => {
		expect(wrap(0, 100, 100)).toBe(0);
		expect(wrap(-50, 50, 50)).toBe(-50);
	});

	it("should work with single-step ranges", () => {
		expect(wrap(0, 1, 5)).toBe(0);
		expect(wrap(0, 1, -5)).toBe(0);
	});

	it("should handle edge cases for zero-length ranges", () => {
		expect(wrap(5, 5, 10)).toBe(NaN); // Range is invalid, should be undefined behavior.
	});
});
