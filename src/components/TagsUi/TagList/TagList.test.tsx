import { createMockTag } from "@/lib/testUtils/testUtils";
import { render, screen } from "@testing-library/react";
import TagList from "./TagList";

const mockedTags = [
	createMockTag({ name: "React", slug: "react" }),
	createMockTag({ name: "Next.js", slug: "next-js" }),
	createMockTag({ name: "JavaScript", slug: "javascript" }),
];

describe("TagList Component", () => {
	test("renders correctly with a list of tags", () => {
		render(<TagList tags={mockedTags} />);

		mockedTags.forEach((tag) => {
			expect(screen.getByText(tag.name)).toBeInTheDocument();
		});
	});

	test("renders correctly with a list of tags and motionInitialDelay", () => {
		const motionInitialDelay = 0.5;
		render(
			<TagList tags={mockedTags} motionInitialDelay={motionInitialDelay} />,
		);

		mockedTags.forEach((tag) => {
			expect(screen.getByText(tag.name)).toBeInTheDocument();
		});
	});
});
