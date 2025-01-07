import { render, screen } from "@testing-library/react";
import TagList from "./TagList";

describe("TagList Component", () => {
	test("renders correctly with a list of tags", () => {
		const tags = ["React", "Next.js", "JavaScript"];
		render(<TagList tags={tags} />);

		tags.forEach((tag) => {
			expect(screen.getByText(tag)).toBeInTheDocument();
		});
	});

	test("renders correctly with a list of tags and motionInitialDelay", () => {
		const tags = ["React", "Next.js", "JavaScript"];
		const motionInitialDelay = 0.5;
		render(<TagList tags={tags} motionInitialDelay={motionInitialDelay} />);

		tags.forEach((tag) => {
			expect(screen.getByText(tag)).toBeInTheDocument();
		});
	});
});
