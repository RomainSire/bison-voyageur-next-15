import { API_URL } from "@/publicConfig";
import BaseSchema from "@/Schemas/BaseSchema";
import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus<BaseSchema>(API_URL).with(
	rest({
		onRequest: (options) => ({ ...options, cache: "no-store" }),
	}),
);

export default directus;
