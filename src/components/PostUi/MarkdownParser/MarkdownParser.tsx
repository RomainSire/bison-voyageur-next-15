import ReactMarkdown, { type Components } from "react-markdown";
import PostImage from "../PostImage/PostImage";

type ParseContentType = {
	markdown: string;
	onImageClick?: (image: { src: string; alt: string }) => void;
};

export default function MarkdownParser({
	markdown,
	onImageClick,
}: ParseContentType) {
	const components: Partial<Components> = {
		p: ({ node, children }) => {
			// Case: Image
			/**
			 * NB: do not use the "img" key to customize the images (the same way the key "p" is used to customize paragraphs). Because in the "img" case, react-markdown wraps the image in a paragraph tag, which is not the desired behavior.
			 */
			if (node.children[0].tagName === "img") {
				const image = node.children[0];
				return (
					<PostImage
						src={image.properties.src}
						alt={image.properties.alt}
						onImageClick={onImageClick}
					/>
				);
			}

			// Case: Text
			return <p>{children}</p>;
		},
	};

	return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
}
