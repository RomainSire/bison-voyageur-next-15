import { createMockTag } from "@/lib/testUtils/testUtils";
import { TagType } from "@/Types/TagType";
import { render, screen } from "@testing-library/react";
import { Entry } from "contentful";
import TagList from "./TagList";

const mockedTags: Entry<TagType, undefined, string>[] = [
	createMockTag({
		id: "1",
		name: "React",
		slug: "react",
	}),
	createMockTag({
		id: "2",
		name: "Next.js",
		slug: "next-js",
	}),
	createMockTag({
		id: "3",
		name: "JavaScript",
		slug: "javascript",
	}),
];

describe("TagList Component", () => {
	test("renders correctly with a list of tags", () => {
		render(<TagList tags={mockedTags} />);

		mockedTags.forEach((tag) => {
			expect(screen.getByText(tag.fields.name)).toBeInTheDocument();
		});
	});

	test("renders correctly with a list of tags and motionInitialDelay", () => {
		const motionInitialDelay = 0.5;
		render(
			<TagList tags={mockedTags} motionInitialDelay={motionInitialDelay} />,
		);

		mockedTags.forEach((tag) => {
			expect(screen.getByText(tag.fields.name)).toBeInTheDocument();
		});
	});
});
