import ReactMarkdown, { type Components } from "react-markdown";
import PostImage from "../PostImage/PostImage";

type ParseContentType = {
	markdown: string;
};

export default function MarkdownParser({ markdown }: ParseContentType) {
	const components: Partial<Components> = {
		/**
		 * NB: do not use this method to render images, because react-markdown wraps the image in a paragraph tag.
		 */
		// img: ({ src, alt }) => {
		// 	return <Image src={src ?? ""} alt={alt ?? ""} width={400} height={400} />;
		// },
		p: ({ node, children }) => {
			// Case: Image (NOT wrapped in a paragraph tag!)
			if (node.children[0].tagName === "img") {
				const image = node.children[0];
				return (
					<PostImage src={image.properties.src} alt={image.properties.alt} />
				);
			}

			// Case: Text
			return <p>{children}</p>;
		},
	};

	return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
}
