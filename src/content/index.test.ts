/**
 * @jest-environment node
 */
import {
	getAllPosts,
	getAllTags,
	getLastPosts,
	getPostBySlug,
	getPostsByTag,
	getTagBySlug,
} from "./index";

const slugs = (posts: { slug: string }[]) => posts.map((post) => post.slug);

describe("real content", () => {
	it("passes validation and has 29 posts and 9 tags", () => {
		expect(getAllPosts()).toHaveLength(29);
		expect(getAllTags()).toHaveLength(9);
	});

	it("takes the slug from the frontmatter, not the file name", () => {
		// file: 08-hongrie-buda-and-pest.md
		expect(getPostBySlug("hongrie-buda-et-pest")?.title).toBeDefined();
		expect(getPostBySlug("hongrie-buda-and-pest")).toBeUndefined();
	});

	it("gives the tags of a post in the global order", () => {
		expect(
			getPostBySlug("tibet-om-mani-padme-hum")?.tags.map((tag) => tag.slug),
		).toEqual(["tour-du-monde", "asie", "grosse-claque", "coup-de-coeur"]);
	});

	it("takes the main picture caption of 02 from mainPictureCaption", () => {
		expect(getPostBySlug("ca-se-concretise")?.mainPicture).toMatchObject({
			src: "/pictures/02-ca-se-concretise/02-ca-se-concretise.jpg",
			caption: "Une carte du monde avec des épingles pointant des pays",
		});
	});

	it("lists the 61 pictures of 19, in the order of the text", () => {
		const pictures = getPostBySlug("tibet-om-mani-padme-hum")!.pictures;
		expect(pictures).toHaveLength(61);
		expect(pictures[0]).toMatchObject({
			src: "/pictures/19-tibet-om-mani-padme-hum/01_01_DSC_0982_4ee613abae.JPG",
			caption: "palais de Potala qui domine Lhassa, la capitale du Tibet",
		});
		expect(pictures[0].width).toBeGreaterThan(0);
		expect(pictures[0].height).toBeGreaterThan(0);
	});
});

describe("access functions", () => {
	it("getAllPosts sorts by date, newest first by default", () => {
		const desc = slugs(getAllPosts());
		expect(desc[0]).toBe("ile-de-paques-mo-ai-and-rapa-nui");
		expect(desc[28]).toBe("un-reve");
		expect(slugs(getAllPosts("desc"))).toEqual(desc);
	});

	it("getAllPosts('asc') sorts oldest first", () => {
		const asc = slugs(getAllPosts("asc"));
		expect(asc.slice(0, 3)).toEqual([
			"un-reve",
			"ca-se-concretise",
			"le-doute",
		]);
		expect(asc[28]).toBe("ile-de-paques-mo-ai-and-rapa-nui");
	});

	it("getAllPosts returns previews without body nor pictures", () => {
		const preview = getAllPosts()[0];
		expect(preview).not.toHaveProperty("content");
		expect(preview).not.toHaveProperty("pictures");
	});

	it("getLastPosts returns the n newest posts, 3 by default", () => {
		expect(slugs(getLastPosts())).toEqual([
			"ile-de-paques-mo-ai-and-rapa-nui",
			"tahiti-doucement-le-matin",
			"nouvelle-zelande-freeman-s",
		]);
		expect(slugs(getLastPosts(1))).toEqual([
			"ile-de-paques-mo-ai-and-rapa-nui",
		]);
	});

	it("getPostsByTag returns the posts of the tag, newest first", () => {
		expect(slugs(getPostsByTag("coup-de-coeur"))).toEqual([
			"ile-de-paques-mo-ai-and-rapa-nui",
			"laos-sabaidi",
			"tibet-om-mani-padme-hum",
		]);
		expect(getPostsByTag("unknown")).toEqual([]);
	});

	it("getPostBySlug returns undefined for an unknown slug", () => {
		expect(getPostBySlug("unknown")).toBeUndefined();
	});

	it("getAllTags keeps the order of tags.json", () => {
		expect(getAllTags().map((tag) => tag.slug)).toEqual([
			"tour-du-monde",
			"preparatifs",
			"galeres",
			"europe",
			"asie",
			"oceanie",
			"pacifique",
			"grosse-claque",
			"coup-de-coeur",
		]);
	});

	it("getTagBySlug finds a tag, or returns undefined", () => {
		expect(getTagBySlug("coup-de-coeur")).toEqual({
			slug: "coup-de-coeur",
			name: "Coup de cœur",
		});
		expect(getTagBySlug("unknown")).toBeUndefined();
	});
});
