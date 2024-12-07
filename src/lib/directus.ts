import BaseSchema from "@/Schemas/BaseSchema";
import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus<BaseSchema>("https://directus.romainsire.com").with(
	rest({
		onRequest: (options) => ({ ...options, cache: "no-store" }),
	}),
);

export default directus;
