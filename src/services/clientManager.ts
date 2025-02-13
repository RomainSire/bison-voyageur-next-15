import { createClient } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
if (!spaceId || !accessToken) {
	throw new Error("Contentful spaceId and accessToken must be provided");
}

export const contentfulClient = createClient({
	space: spaceId,
	accessToken: accessToken,
});
