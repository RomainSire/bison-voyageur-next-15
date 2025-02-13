import { TagType } from "@/Types/TagType";
import { render, screen } from "@testing-library/react";
import { Entry } from "contentful";
import TagList from "./TagList";

const mockedTags = [
	{
		sys: {
			id: "1",
		},
		fields: {
			name: "React",
		},
	},
	{
		sys: {
			id: "2",
		},
		fields: {
			name: "Next.js",
		},
	},
	{
		sys: {
			id: "3",
		},
		fields: {
			name: "JavaScript",
		},
	},
] as Entry<TagType, undefined, string>[];

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
