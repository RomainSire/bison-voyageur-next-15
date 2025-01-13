import {
	handleHorizontalSwipe,
	handleVerticalSwipe,
} from "./swipeGestureHelper";

describe("handleHorizontalSwipe", () => {
	it("should return 1 for swipe up", () => {
		const event = new MouseEvent("mousemove");
		const result = handleHorizontalSwipe(event, {
			offset: { x: 200, y: 0 },
			velocity: { x: -60, y: 0 },
		});
		expect(result).toBe(1);
	});

	it("should return -1 for swipe down", () => {
		const event = new MouseEvent("mousemove");
		const result = handleHorizontalSwipe(event, {
			offset: { x: 200, y: 0 },
			velocity: { x: 60, y: 0 },
		});
		expect(result).toBe(-1);
	});

	it("should return 0 for no swipe", () => {
		const event = new MouseEvent("mousemove");
		const result = handleHorizontalSwipe(event, {
			offset: { x: 50, y: 0 },
			velocity: { x: 1, y: 0 },
		});
		expect(result).toBe(0);
	});
});

describe("handleVerticalSwipe", () => {
	it("should return 1 for swipe up", () => {
		const event = new MouseEvent("mousemove");
		const result = handleVerticalSwipe(event, {
			offset: { x: 0, y: 200 },
			velocity: { x: 0, y: -60 },
		});
		expect(result).toBe(1);
	});

	it("should return -1 for swipe down", () => {
		const event = new MouseEvent("mousemove");
		const result = handleVerticalSwipe(event, {
			offset: { x: 0, y: 200 },
			velocity: { x: 0, y: 60 },
		});
		expect(result).toBe(-1);
	});

	it("should return 0 for no swipe", () => {
		const event = new MouseEvent("mousemove");
		const result = handleVerticalSwipe(event, {
			offset: { x: 0, y: 50 },
			velocity: { x: 0, y: 1 },
		});
		expect(result).toBe(0);
	});
});
