import { PostType, PostTypeLight } from "@/Types/PostType";
import { TagType } from "@/Types/TagType";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { Asset, Entry } from "contentful";

/**
 * Create a mock asset link
 * MARK: Asset Link
 */
type MockAssetLinkCustomInputs = {
	id?: string;
	title?: string;
	url?: string;
	fileName?: string;
	contentType?: string;
	size?: number;
	width?: number;
	height?: number;
};

export const createMockAssetLink = (
	customInputs?: MockAssetLinkCustomInputs,
): Asset<undefined, string> => ({
	sys: {
		type: "Asset",
		id: customInputs?.id ?? "mock-asset-id",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
		revision: 1,
		publishedVersion: 1,
		space: {
			sys: {
				type: "Link",
				linkType: "Space",
				id: "mock-space-id",
			},
		},
		environment: {
			sys: {
				type: "Link",
				linkType: "Environment",
				id: "mock-env-id",
			},
		},
	},
	fields: {
		title: customInputs?.title ?? "Mock Image",
		description: "",
		file: {
			url: customInputs?.url ?? "//path/to/mock-image.jpg",
			details: {
				size: customInputs?.size ?? 100,
				image: {
					width: customInputs?.width ?? 100,
					height: customInputs?.height ?? 100,
				},
			},
			fileName: customInputs?.fileName ?? "mock-image.jpg",
			contentType: customInputs?.contentType ?? "image/jpeg",
		},
	},
	metadata: { tags: [] },
});

/**
 * Create a mock tag
 * MARK: Tag
 */
type MockTagCustomInputs = {
	id?: string;
	name?: string;
	slug?: string;
};
export const createMockTag = (
	customInputs?: MockTagCustomInputs,
): Entry<TagType, undefined, string> => ({
	sys: {
		type: "Entry",
		id: customInputs?.id ?? "mock-tag-id",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
		revision: 1,
		publishedVersion: 1,
		space: {
			sys: {
				type: "Link",
				linkType: "Space",
				id: "mock-space-id",
			},
		},
		environment: {
			sys: {
				type: "Link",
				linkType: "Environment",
				id: "mock-env-id",
			},
		},
		contentType: {
			sys: {
				type: "Link",
				linkType: "ContentType",
				id: "tag",
			},
		},
	},
	fields: {
		name: customInputs?.name ?? "Mock Tag",
		slug: customInputs?.slug ?? "mock-tag",
	},
	metadata: {
		tags: [],
	},
});

/**
 * Create a mock post light
 * MARK: Post Light
 */
type MockPostLightCustomInputs = {
	id?: string;
	title?: string;
	slug?: string;
	date?: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
	summary?: string;
	thumbnail?: MockAssetLinkCustomInputs;
	tags?: MockTagCustomInputs[];
};

export const createMockPostLight = (
	customInputs?: MockPostLightCustomInputs,
): Entry<PostTypeLight, undefined, string> => ({
	sys: {
		type: "Entry",
		id: customInputs?.id ?? "mock-post-id",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
		revision: 1,
		publishedVersion: 1,
		space: {
			sys: {
				type: "Link",
				linkType: "Space",
				id: "mock-space-id",
			},
		},
		environment: {
			sys: {
				type: "Link",
				linkType: "Environment",
				id: "mock-env-id",
			},
		},
		contentType: {
			sys: {
				type: "Link",
				linkType: "ContentType",
				id: "post",
			},
		},
	},
	fields: {
		title: customInputs?.title ?? "Mock Post",
		slug: customInputs?.slug ?? "mock-post",
		date: customInputs?.date ?? "2024-12-01T00:00:00Z",
		summary: customInputs?.summary ?? "Mock summary",
		thumbnail: createMockAssetLink(customInputs?.thumbnail),
		tags: customInputs?.tags?.map((tag) => createMockTag(tag)) ?? [],
	},
	metadata: {
		tags: [],
	},
});

/**
 * Create a mock post
 * MARK: Post
 */
type MockPostCustomInputs = {
	id?: string;
	title?: string;
	slug?: string;
	date?: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
	summary?: string;
	thumbnail?: MockAssetLinkCustomInputs;
	featuredImage?: MockAssetLinkCustomInputs;
	content?: Document;
	tags?: MockTagCustomInputs[];
};

export const createMockPost = (
	customInputs?: MockPostCustomInputs,
): Entry<PostType, undefined, string> => ({
	sys: {
		type: "Entry",
		id: customInputs?.id ?? "mock-post-id",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
		revision: 1,
		publishedVersion: 1,
		space: {
			sys: {
				type: "Link",
				linkType: "Space",
				id: "mock-space-id",
			},
		},
		environment: {
			sys: {
				type: "Link",
				linkType: "Environment",
				id: "mock-env-id",
			},
		},
		contentType: {
			sys: {
				type: "Link",
				linkType: "ContentType",
				id: "post",
			},
		},
	},
	fields: {
		title: customInputs?.title ?? "Mock Post",
		slug: customInputs?.slug ?? "mock-post",
		date: customInputs?.date ?? "2024-12-01T00:00:00Z",
		summary: customInputs?.summary ?? "Mock summary",
		thumbnail: createMockAssetLink(customInputs?.thumbnail),
		featuredImage: createMockAssetLink(customInputs?.featuredImage),
		content: customInputs?.content ?? {
			nodeType: BLOCKS.DOCUMENT,
			content: [
				{
					nodeType: BLOCKS.PARAGRAPH,
					content: [
						{
							nodeType: "text",
							value: "Sample Content",
							marks: [],
							data: {},
						},
					],
					data: {},
				},
			],
			data: {},
		},
		tags: customInputs?.tags?.map((tag) => createMockTag(tag)) ?? [],
	},
	metadata: {
		tags: [],
	},
});
