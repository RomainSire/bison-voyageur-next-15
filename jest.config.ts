import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	// Add more setup options before each test is run
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};

// ESM-only packages (unified / remark ecosystem) must be transformed by Jest.
// next/jest only lets us append ignore patterns, so we replace its node_modules
// patterns here, in the same pnpm-aware shape.
const esmPackages = [
	"remark-[^/@]+",
	"mdast-util-[^/@]+",
	"micromark[^/@]*",
	"unist-util-[^/@]+",
	"unified",
	"vfile[^/@]*",
	"decode-named-character-reference",
	"character-entities",
	"devlop",
	"bail",
	"is-plain-obj",
	"trough",
].join("|");

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const nextJestConfig = createJestConfig(config);

const jestConfig = async (): Promise<Config> => {
	const resolved = await nextJestConfig();
	return {
		...resolved,
		transformIgnorePatterns: [
			`/node_modules/(?!\\.pnpm)(?!(${esmPackages})/)`,
			`/node_modules/\\.pnpm/(?!(${esmPackages})@)`,
			...(resolved.transformIgnorePatterns ?? []).filter(
				(pattern) => !pattern.includes("node_modules"),
			),
		],
	};
};

export default jestConfig;
