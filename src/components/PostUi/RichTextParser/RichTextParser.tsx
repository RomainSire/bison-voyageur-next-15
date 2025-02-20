import {
	documentToReactComponents,
	Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { Asset } from "contentful";
import RichTextImage from "../RichTextImage/RichTextImage";

type RichTextParserProps = Readonly<{
	children: Document;
	onImageClick?: (image: Asset) => void;
}>;

export default function RichTextParser({
	children,
	onImageClick,
}: RichTextParserProps) {
	const options: Options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET]: (node) => {
				return (
					<RichTextImage image={node.data.target} onImageClick={onImageClick} />
				);
			},
		},
	};

	return documentToReactComponents(children, options);
}
