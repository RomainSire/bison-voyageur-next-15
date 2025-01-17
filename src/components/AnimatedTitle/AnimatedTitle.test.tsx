import { render, screen } from "@testing-library/react";
import AnimatedTitle from "./AnimatedTitle";

describe("AnimatedTitle Component", () => {
	test("renders correctly with type h1", () => {
		render(<AnimatedTitle type="h1">Test Title</AnimatedTitle>);
		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	test("renders correctly with type h2", () => {
		render(<AnimatedTitle type="h2">Test Title</AnimatedTitle>);
		expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	test("renders correctly with type h3", () => {
		render(<AnimatedTitle type="h3">Test Title</AnimatedTitle>);
		expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	test("renders correctly with type h4", () => {
		render(<AnimatedTitle type="h4">Test Title</AnimatedTitle>);
		expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	test("renders correctly with type h5", () => {
		render(<AnimatedTitle type="h5">Test Title</AnimatedTitle>);
		expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	test("renders correctly with type h6", () => {
		render(<AnimatedTitle type="h6">Test Title</AnimatedTitle>);
		expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});
});
