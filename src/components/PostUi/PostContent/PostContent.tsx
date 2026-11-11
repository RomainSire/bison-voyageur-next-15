import FormatedDate from "@/components/FormatedDate/FormatedDate";
import type { Post } from "@/content";
import type { Element, ElementContent } from "hast";
import Markdown, { type Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import PostGallery from "../PostGallery/PostGallery";
import PostImage from "../PostImage/PostImage";
import style from "./PostContent.module.css";

type PostContentProps = {
	post: Post;
	className?: string;
	motionInitialDelay?: number;
};

const isImage = (node: ElementContent): node is Element =>
	node.type === "element" && node.tagName === "img";

/** Line breaks and blank text between photos written on consecutive lines. */
const isFiller = (node: ElementContent) =>
	(node.type === "element" && node.tagName === "br") ||
	(node.type === "text" && node.value.trim() === "");

const components: Components = {
	// A paragraph of photos only (photos on consecutive lines) is rendered as
	// the photos alone: each photo is its own block of the content grid.
	p: ({ node, children }) => {
		const nodes = node?.children ?? [];
		if (nodes.some(isImage) && nodes.every((n) => isImage(n) || isFiller(n))) {
			return nodes
				.filter(isImage)
				.map((image, index) => (
					<PostImage key={index} src={String(image.properties.src)} />
				));
		}
		return <p>{children}</p>;
	},
	img: ({ src }) => <PostImage src={String(src)} />,
	ul: ({ children }) => (
		<ul style={{ listStyle: "disc", paddingLeft: "var(--lg)" }}>{children}</ul>
	),
};

/**
 * Body of a post, rendered from its Markdown on the server.
 */
export default function PostContent({
	post,
	className,
	motionInitialDelay = 0,
}: PostContentProps) {
	return (
		<PostGallery
			pictures={post.pictures}
			className={`${style.content} ${className ?? ""}`}
			motionInitialDelay={motionInitialDelay}
		>
			<FormatedDate date={post.date} className={style.date} />
			<Markdown remarkPlugins={[remarkBreaks]} components={components}>
				{post.content}
			</Markdown>
		</PostGallery>
	);
}
