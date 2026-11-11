import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
import type { Image, Nodes } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type { Picture, Post, Tag } from "./types";
import {
	mainPicturePath,
	type ParsedPost,
	type TextPicture,
	validateContent,
} from "./validate";

export type Content = { posts: Post[]; tags: Tag[] };

const markdownParser = unified().use(remarkParse);

const collectImages = (node: Nodes, images: Image[] = []): Image[] => {
	if (node.type === "image") images.push(node);
	if ("children" in node) {
		for (const child of node.children) collectImages(child, images);
	}
	return images;
};

const parsePost = (postsDir: string, file: string): ParsedPost => {
	const source = fs.readFileSync(path.join(postsDir, file), "utf8");
	// Passing options disables gray-matter's cache, which shares data objects.
	const { data, content } = matter(source, {});
	const pictures = collectImages(markdownParser.parse(content)).map(
		(image) => ({ path: image.url, caption: image.alt ?? "" }),
	);
	return { file, data, content, pictures };
};

/**
 * Reads content/posts/*.md, content/tags.json and the picture sizes from
 * public/pictures/ under `rootDir` (the project folder by default).
 */
export const loadContent = (rootDir: string = process.cwd()): Content => {
	const postsDir = path.join(rootDir, "content", "posts");
	const picturesDir = path.join(rootDir, "public", "pictures");
	const tags: Tag[] = JSON.parse(
		fs.readFileSync(path.join(rootDir, "content", "tags.json"), "utf8"),
	);

	const parsed = fs
		.readdirSync(postsDir)
		.filter((file) => file.endsWith(".md"))
		.sort()
		.map((file) => parsePost(postsDir, file));
	validateContent(parsed, tags, picturesDir);

	const toPicture = (file: string, picture: TextPicture): Picture => {
		let size;
		try {
			size = imageSize(fs.readFileSync(path.join(picturesDir, picture.path)));
		} catch (error) {
			throw new Error(
				`${file}: cannot read the size of picture "${picture.path}"`,
				{ cause: error },
			);
		}
		const { width, height } = size;
		return {
			src: `/pictures/${picture.path}`,
			width,
			height,
			caption: picture.caption,
		};
	};

	const posts = parsed.map(({ file, data, content, pictures }): Post => {
		const mainPath = mainPicturePath(file, data.mainPicture as string);
		const mainCaption =
			(data.mainPictureCaption as string | undefined) ??
			pictures.find((picture) => picture.path === mainPath)!.caption;
		return {
			slug: data.slug as string,
			title: data.title as string,
			date: data.date as string,
			summary: data.summary as string,
			tags: tags.filter((tag) => (data.tags as string[]).includes(tag.slug)),
			mainPicture: toPicture(file, { path: mainPath, caption: mainCaption }),
			content,
			pictures: pictures.map((picture) => toPicture(file, picture)),
		};
	});

	return { posts, tags };
};
