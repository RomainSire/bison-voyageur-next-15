import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tag from "./Tag";

// Mock post object
const mockedTag = {
	sys: {
		id: "1",
	},
	fields: {
		name: "test-tag",
		slug: "test-tag",
	},
} as any;

describe("Tag component", () => {
	test("renders correctly with a given tag", () => {
		render(<Tag tag={mockedTag} />);
		const linkElement = screen.getByText("test-tag");
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", "/tag/test-tag");
	});

	test("renders correctly with a given tag and motionInitialDelay", () => {
		render(<Tag tag={mockedTag} motionInitialDelay={0.5} />);
		const linkElement = screen.getByText("test-tag");
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", "/tag/test-tag");
	});
});
