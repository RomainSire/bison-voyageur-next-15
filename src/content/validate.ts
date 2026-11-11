import fs from "node:fs";
import path from "node:path";
import type { Tag } from "./types";

/** A picture as cited in the Markdown: path relative to public/pictures/. */
export type TextPicture = { path: string; caption: string };

/** A post file as read from disk, before validation. */
export type ParsedPost = {
	file: string;
	data: Record<string, unknown>;
	content: string;
	pictures: TextPicture[];
};

const REQUIRED_STRING_KEYS = [
	"title",
	"slug",
	"date",
	"summary",
	"mainPicture",
] as const;
const KNOWN_KEYS = new Set<string>([
	...REQUIRED_STRING_KEYS,
	"tags",
	"mainPictureCaption",
]);

const isNonEmptyString = (value: unknown): value is string =>
	typeof value === "string" && value.trim() !== "";

const frontmatterErrors = ({ file, data }: ParsedPost): string[] => {
	const errors: string[] = [];
	for (const key of Object.keys(data)) {
		if (!KNOWN_KEYS.has(key)) errors.push(`${file}: unknown key "${key}"`);
	}
	for (const key of REQUIRED_STRING_KEYS) {
		if (!(key in data)) errors.push(`${file}: missing key "${key}"`);
		else if (!isNonEmptyString(data[key]))
			errors.push(`${file}: "${key}" must be a non-empty string`);
	}
	if (!("tags" in data)) errors.push(`${file}: missing key "tags"`);
	else if (
		!Array.isArray(data.tags) ||
		!data.tags.every((tag) => isNonEmptyString(tag))
	)
		errors.push(`${file}: "tags" must be a list of strings`);
	if (
		"mainPictureCaption" in data &&
		!isNonEmptyString(data.mainPictureCaption)
	)
		errors.push(`${file}: "mainPictureCaption" must be a non-empty string`);
	if (typeof data.date === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(data.date))
		errors.push(`${file}: "date" must be YYYY-MM-DD, got "${data.date}"`);
	return errors;
};

const duplicateErrors = (
	posts: ParsedPost[],
	key: "slug" | "date",
): string[] => {
	const filesByValue = new Map<string, string[]>();
	for (const { file, data } of posts) {
		const value = data[key];
		if (typeof value !== "string") continue;
		filesByValue.set(value, [...(filesByValue.get(value) ?? []), file]);
	}
	return [...filesByValue]
		.filter(([, files]) => files.length > 1)
		.map(([value, files]) => `${files.join(", ")}: same ${key} "${value}"`);
};

const tagErrors = (posts: ParsedPost[], tags: Tag[]): string[] => {
	const errors: string[] = [];
	const declared = new Set(tags.map((tag) => tag.slug));
	const used = new Set<string>();
	for (const { file, data } of posts) {
		if (!Array.isArray(data.tags)) continue;
		const seen = new Set<unknown>();
		for (const tag of data.tags) {
			if (seen.has(tag)) errors.push(`${file}: tag "${tag}" cited twice`);
			seen.add(tag);
			used.add(tag);
			if (!declared.has(tag))
				errors.push(`${file}: tag "${tag}" is not in content/tags.json`);
		}
	}
	for (const slug of declared) {
		if (!used.has(slug))
			errors.push(`content/tags.json: tag "${slug}" is carried by no post`);
	}
	return errors;
};

/** Path of the main picture, relative to public/pictures/. */
export const mainPicturePath = (file: string, mainPicture: string) =>
	`${path.basename(file, ".md")}/${mainPicture}`;

const pictureErrors = (
	{ file, data, pictures }: ParsedPost,
	picturesDir: string,
): string[] => {
	const errors: string[] = [];
	const exists = (picture: string) =>
		fs
			.statSync(path.join(picturesDir, picture), { throwIfNoEntry: false })
			?.isFile() ?? false;

	for (const picture of pictures) {
		if (!exists(picture.path))
			errors.push(
				`${file}: picture "${picture.path}" not found in public/pictures/`,
			);
		if (picture.caption.trim() === "")
			errors.push(`${file}: picture "${picture.path}" has an empty caption`);
	}

	if (typeof data.mainPicture === "string") {
		const mainPath = mainPicturePath(file, data.mainPicture);
		if (!exists(mainPath))
			errors.push(
				`${file}: main picture "${mainPath}" not found in public/pictures/`,
			);
		const inText = pictures.some((picture) => picture.path === mainPath);
		const hasCaption = "mainPictureCaption" in data;
		if (!inText && !hasCaption)
			errors.push(
				`${file}: main picture "${mainPath}" is not in the text and there is no mainPictureCaption`,
			);
		if (inText && hasCaption)
			errors.push(
				`${file}: main picture "${mainPath}" is in the text, mainPictureCaption must be removed`,
			);
	}
	return errors;
};

/**
 * The single validation of the content. Throws one error listing every
 * problem found, each message naming the post file and the faulty element.
 */
export const validateContent = (
	posts: ParsedPost[],
	tags: Tag[],
	picturesDir: string,
): void => {
	const errors = [
		...posts.flatMap(frontmatterErrors),
		...duplicateErrors(posts, "slug"),
		...duplicateErrors(posts, "date"),
		...tagErrors(posts, tags),
		...posts.flatMap((post) => pictureErrors(post, picturesDir)),
	];
	if (errors.length > 0) {
		throw new Error(`Invalid content:\n- ${errors.join("\n- ")}`);
	}
};
