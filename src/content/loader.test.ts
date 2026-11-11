/**
 * @jest-environment node
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { loadContent } from "./loader";

const VALID = path.join(__dirname, "__fixtures__", "valid");

const tmpDirs: string[] = [];
afterAll(() => {
	for (const dir of tmpDirs) fs.rmSync(dir, { recursive: true, force: true });
});

/**
 * Copies the valid fixture folder to a temporary folder, then replaces
 * `from` with `to` in `file` (relative to the folder).
 */
const fixtureWith = (
	...edits: { file: string; from: string; to: string }[]
): string => {
	const root = fs.mkdtempSync(path.join(os.tmpdir(), "content-"));
	tmpDirs.push(root);
	fs.cpSync(VALID, root, { recursive: true });
	for (const { file, from, to } of edits) {
		const filePath = path.join(root, file);
		const source = fs.readFileSync(filePath, "utf8");
		if (!source.includes(from)) throw new Error(`"${from}" not in ${file}`);
		fs.writeFileSync(filePath, source.replace(from, to));
	}
	return root;
};

const ALPHA = "content/posts/01-alpha.md";
const BETA = "content/posts/02-beta.md";

/** Expects loading to fail with a message naming every given fragment. */
const expectError = (root: string, ...fragments: string[]) => {
	let message: string | undefined;
	try {
		loadContent(root);
	} catch (error) {
		message = (error as Error).message;
	}
	expect(message).toBeDefined();
	for (const fragment of fragments) expect(message).toContain(fragment);
};

describe("loadContent on a valid folder", () => {
	it("builds posts with their pictures, dimensions and captions", () => {
		const { posts } = loadContent(VALID);
		const alpha = posts.find((p) => p.slug === "alpha-slug");

		expect(alpha).toEqual({
			slug: "alpha-slug",
			title: "Alpha",
			date: "2013-01-10",
			summary: "Résumé alpha",
			tags: [
				{ slug: "europe", name: "Europe" },
				{ slug: "coup-de-coeur", name: "Coup de cœur" },
			],
			mainPicture: {
				src: "/pictures/01-alpha/b.jpg",
				width: 2,
				height: 5,
				caption: "une photo bleue",
			},
			content: expect.stringContaining("Premier paragraphe."),
			pictures: [
				{
					src: "/pictures/01-alpha/a.png",
					width: 4,
					height: 3,
					caption: "une photo rouge",
				},
				{
					src: "/pictures/01-alpha/b.jpg",
					width: 2,
					height: 5,
					caption: "une photo bleue",
				},
			],
		});
		expect(alpha?.content).not.toContain("slug:");
	});

	it("takes the main picture caption from the frontmatter when it is not in the text", () => {
		const { posts } = loadContent(VALID);
		const beta = posts.find((p) => p.slug === "beta-slug");

		expect(beta?.mainPicture).toEqual({
			src: "/pictures/02-beta/main.png",
			width: 6,
			height: 2,
			caption: "Une photo verte",
		});
		expect(beta?.pictures).toEqual([]);
	});

	it("returns the tags in the order of tags.json", () => {
		expect(loadContent(VALID).tags).toEqual([
			{ slug: "europe", name: "Europe" },
			{ slug: "coup-de-coeur", name: "Coup de cœur" },
		]);
	});
});

describe("loadContent validation: frontmatter", () => {
	it("fails when a key is missing", () => {
		const root = fixtureWith({
			file: ALPHA,
			from: 'summary: "Résumé alpha"\n',
			to: "",
		});
		expectError(root, "01-alpha.md", "summary");
	});

	it("fails when a key has the wrong type", () => {
		const root = fixtureWith({
			file: BETA,
			from: 'tags: ["europe"]',
			to: 'tags: "europe"',
		});
		expectError(root, "02-beta.md", "tags");
	});

	it("fails on an unknown key", () => {
		const root = fixtureWith({
			file: ALPHA,
			from: 'title: "Alpha"',
			to: 'title: "Alpha"\norder: 3',
		});
		expectError(root, "01-alpha.md", "order");
	});

	it("fails when the date is not YYYY-MM-DD", () => {
		const root = fixtureWith({
			file: BETA,
			from: '"2013-02-20"',
			to: '"20/02/2013"',
		});
		expectError(root, "02-beta.md", "date");
	});

	it("fails when the date is not a quoted string", () => {
		const root = fixtureWith({
			file: BETA,
			from: '"2013-02-20"',
			to: "2013-02-20",
		});
		expectError(root, "02-beta.md", "date");
	});
});

describe("loadContent validation: unique slugs and dates", () => {
	it("fails when two posts have the same slug", () => {
		const root = fixtureWith({
			file: BETA,
			from: '"beta-slug"',
			to: '"alpha-slug"',
		});
		expectError(root, "01-alpha.md", "02-beta.md", "alpha-slug");
	});

	it("fails when two posts have the same date", () => {
		const root = fixtureWith({
			file: BETA,
			from: '"2013-02-20"',
			to: '"2013-01-10"',
		});
		expectError(root, "01-alpha.md", "02-beta.md", "2013-01-10");
	});
});

describe("loadContent validation: tags", () => {
	it("fails when a post cites a tag missing from tags.json", () => {
		const root = fixtureWith({
			file: BETA,
			from: '["europe"]',
			to: '["europe", "asie"]',
		});
		expectError(root, "02-beta.md", "asie");
	});

	it("fails when a post cites the same tag twice", () => {
		const root = fixtureWith({
			file: BETA,
			from: '["europe"]',
			to: '["europe", "europe"]',
		});
		expectError(root, "02-beta.md", "europe");
	});

	it("fails when a declared tag is carried by no post", () => {
		const root = fixtureWith({
			file: ALPHA,
			from: '["coup-de-coeur", "europe"]',
			to: '["europe"]',
		});
		expectError(root, "content/tags.json", "coup-de-coeur");
	});

	it("accepts a post without tags", () => {
		const root = fixtureWith({ file: BETA, from: '["europe"]', to: "[]" });
		expect(
			loadContent(root).posts.find((p) => p.slug === "beta-slug")?.tags,
		).toEqual([]);
	});
});

describe("loadContent validation: pictures and captions", () => {
	it("fails when a picture of the text does not exist", () => {
		const root = fixtureWith({
			file: ALPHA,
			from: "01-alpha/a.png",
			to: "01-alpha/nope.png",
		});
		expectError(root, "01-alpha.md", "01-alpha/nope.png");
	});

	it("fails when the main picture does not exist", () => {
		const root = fixtureWith({
			file: BETA,
			from: 'mainPicture: "main.png"',
			to: 'mainPicture: "nope.png"',
		});
		expectError(root, "02-beta.md", "02-beta/nope.png");
	});

	it("fails when a picture of the text has an empty caption", () => {
		const root = fixtureWith({
			file: ALPHA,
			from: "![une photo rouge]",
			to: "![ ]",
		});
		expectError(root, "01-alpha.md", "01-alpha/a.png");
	});

	it("fails when the main picture is not in the text and has no mainPictureCaption", () => {
		const root = fixtureWith({
			file: BETA,
			from: 'mainPictureCaption: "Une photo verte"\n',
			to: "",
		});
		expectError(root, "02-beta.md", "mainPictureCaption");
	});

	it("fails when the main picture is in the text and mainPictureCaption is still present", () => {
		const root = fixtureWith({
			file: ALPHA,
			from: 'mainPicture: "b.jpg"',
			to: 'mainPicture: "b.jpg"\nmainPictureCaption: "Une légende en trop"',
		});
		expectError(root, "01-alpha.md", "mainPictureCaption");
	});
});

describe("loadContent: unreadable picture", () => {
	it("fails with the post and the path when a picture size cannot be read", () => {
		const root = fixtureWith();
		fs.writeFileSync(
			path.join(root, "public/pictures/01-alpha/a.png"),
			"not an image",
		);
		expectError(root, "01-alpha.md", "01-alpha/a.png");
	});
});
