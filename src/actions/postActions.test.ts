import directus from "@/lib/directusSDK/directus";
import { readItem, readItems } from "@directus/sdk";
import {
	getAllPosts,
	getAllTags,
	getLastPosts,
	getPostById,
	getPostBySlug,
	getPostsByTag,
} from "./postsActions";

// Mock the directus request and readItem
jest.mock("@/lib/directusSDK/directus", () => ({
	request: jest.fn(),
}));
jest.mock("@directus/sdk", () => ({
	readItem: jest.fn(),
	readItems: jest.fn(),
}));

describe("postsActions", () => {
	const mockPosts = [
		{
			id: "1",
			title: "Post 1",
			slug: "post-1",
			date: "2023-01-01",
			mainPicture: {
				filename_disk: "image1.jpg",
				title: "Image 1",
				height: 100,
				width: 100,
			},
			tag: ["tag 1"],
			summary: "Summary 1",
		},
		{
			id: "2",
			title: "Post 2",
			slug: "post-2",
			date: "2023-01-02",
			mainPicture: {
				filename_disk: "image2.jpg",
				title: "Image 2",
				height: 100,
				width: 100,
			},
			tag: ["tag 2"],
			summary: "Summary 2",
		},
		{
			id: "3",
			title: "Post 3",
			slug: "post-3",
			date: "2023-01-03",
			mainPicture: {
				filename_disk: "image3.jpg",
				title: "Image 3",
				height: 100,
				width: 100,
			},
			tag: ["tag 1", "tag 2", "tag 3"],
			summary: "Summary 3",
		},
		{
			id: "4",
			title: "Post 4",
			slug: "post-4",
			date: "2023-01-04",
			mainPicture: {
				filename_disk: "image4.jpg",
				title: "Image 4",
				height: 100,
				width: 100,
			},
			tag: ["tag 3", "tag 2"],
			summary: "Summary 4",
		},
	];

	beforeEach(() => {
		(directus.request as jest.Mock).mockResolvedValue(mockPosts);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getAllPosts", () => {
		it("should return all the posts", async () => {
			const result = await getAllPosts();
			expect(result).toEqual(mockPosts);
			expect(readItems).toHaveBeenCalledWith("post", expect.any(Object));
		});
	});

	describe("getLastPosts", () => {
		it("should return the last 3 posts by default", async () => {
			const result = await getLastPosts();
			expect(result).toHaveLength(3);
			expect(result[0].id).toBe("1");
			expect(result[1].id).toBe("2");
			expect(result[2].id).toBe("3");
		});

		it("should return the specified number of posts", async () => {
			const result = await getLastPosts(2);
			expect(result).toHaveLength(2);
			expect(result[0].id).toBe("1");
			expect(result[1].id).toBe("2");
		});

		it("should return an empty array if there are no posts", async () => {
			(directus.request as jest.Mock).mockResolvedValue([]);
			const result = await getLastPosts();
			expect(result).toHaveLength(0);
		});
	});

	describe("getPostById", () => {
		it("should return the correct post by id", async () => {
			const id = "2";
			const expectedPost = mockPosts[1];
			(directus.request as jest.Mock).mockResolvedValue(expectedPost);

			const result = await getPostById(id);
			expect(result).toEqual(expectedPost);
			expect(readItem).toHaveBeenCalledWith("post", id, expect.any(Object));
		});
	});

	describe("getPostBySlug", () => {
		it("should return the correct post by slug", async () => {
			const slug = "post-3";
			const expectedPost = mockPosts[2];
			(directus.request as jest.Mock)
				.mockResolvedValueOnce(mockPosts)
				.mockResolvedValueOnce(expectedPost);

			const result = await getPostBySlug(slug);
			expect(result).toEqual(expectedPost);
			expect(readItem).toHaveBeenCalledWith(
				"post",
				expectedPost.id,
				expect.any(Object),
			);
		});

		it("should throw an error if the post is not found", async () => {
			const slug = "non-existent-slug";
			(directus.request as jest.Mock).mockResolvedValue(mockPosts);
			await expect(getPostBySlug(slug)).rejects.toThrow("Post not found");
		});
	});

	describe("getAllTags", () => {
		it("should return all the tags", async () => {
			const result = await getAllTags();
			expect(result).toEqual(["tag 1", "tag 2", "tag 3"]);
		});
	});

	describe("getPostsByTag", () => {
		it("should return all the posts with the specified tag", async () => {
			const result = await getPostsByTag("tag 2");
			expect(result).toHaveLength(3);
			expect(result[0].id).toBe("2");
			expect(result[1].id).toBe("3");
			expect(result[2].id).toBe("4");
		});
	});
});
