import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "directus.romainsire.com",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
