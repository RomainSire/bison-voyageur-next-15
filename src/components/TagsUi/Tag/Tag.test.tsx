import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tag from "./Tag";

describe("Tag component", () => {
	test("renders correctly with a given tag", () => {
		render(<Tag tag="test-tag" />);
		const linkElement = screen.getByText("test-tag");
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", "/tag/test-tag");
	});

	test("renders correctly with a given tag and motionInitialDelay", () => {
		render(<Tag tag="test-tag" motionInitialDelay={0.5} />);
		const linkElement = screen.getByText("test-tag");
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", "/tag/test-tag");
	});
});
