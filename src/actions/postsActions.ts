import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

/**
 * Get the three last posts summary
 */
export async function getLastPosts() {
	return directus.request(
		readItems("post", {
			fields: ["slug", "title", { mainPicture: ["filename_disk", "title", "height", "width"] }, "date"],
			limit: 3,
			sort: "-date",
		}),
	);
}
