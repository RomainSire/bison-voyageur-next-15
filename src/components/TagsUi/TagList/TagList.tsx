import { TagType } from "@/Types/TagType";
import { Entry } from "contentful";
import Tag from "../Tag/Tag";
import style from "./TagList.module.css";

type TagListProps = {
	tags: Entry<TagType, undefined, string>[];
	motionInitialDelay?: number;
};

export default function TagList({
	tags,
	motionInitialDelay = 0,
}: TagListProps) {
	return (
		<nav>
			<ul className={style.tagsList}>
				{tags.map((tag, index) => {
					const selfDelay = (index + 1) * 0.1 + motionInitialDelay;
					return (
						<li key={tag.sys.id}>
							<Tag tag={tag} motionInitialDelay={selfDelay} />
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
