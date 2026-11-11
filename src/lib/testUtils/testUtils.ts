import type { Picture, Post, PostPreview, Tag } from "@/content";

/**
 * Create a mock picture
 * MARK: Picture
 */
export const createMockPicture = (
	customInputs?: Partial<Picture>,
): Picture => ({
	src: "/pictures/01-mock-post/mock-image.jpg",
	width: 100,
	height: 100,
	caption: "Mock Image",
	...customInputs,
});

/**
 * Create a mock tag
 * MARK: Tag
 */
export const createMockTag = (customInputs?: Partial<Tag>): Tag => ({
	slug: "mock-tag",
	name: "Mock Tag",
	...customInputs,
});

/**
 * Create a mock post preview
 * MARK: Post Preview
 */
type MockPostPreviewCustomInputs = Partial<
	Omit<PostPreview, "mainPicture" | "tags">
> & {
	mainPicture?: Partial<Picture>;
	tags?: Partial<Tag>[];
};

export const createMockPostPreview = ({
	mainPicture,
	tags,
	...customInputs
}: MockPostPreviewCustomInputs = {}): PostPreview => ({
	slug: "mock-post",
	title: "Mock Post",
	date: "2024-12-01",
	summary: "Mock summary",
	...customInputs,
	mainPicture: createMockPicture(mainPicture),
	tags: tags?.map((tag) => createMockTag(tag)) ?? [],
});

/**
 * Create a mock post
 * MARK: Post
 */
type MockPostCustomInputs = MockPostPreviewCustomInputs & {
	content?: string;
	pictures?: Partial<Picture>[];
};

export const createMockPost = ({
	content,
	pictures,
	...previewInputs
}: MockPostCustomInputs = {}): Post => ({
	...createMockPostPreview(previewInputs),
	content: content ?? "Sample Content",
	pictures: pictures?.map((picture) => createMockPicture(picture)) ?? [],
});
