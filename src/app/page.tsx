import { getLastPosts } from "@/actions/postsActions";
import directus from "@/lib/directus";
import Image from "next/image";
import style from "./page.module.css";

export default async function Home() {
	const lastPosts = await getLastPosts();

	console.log({ lastPosts });

	return (
		<div className={style.page}>
			<main className={style.main}>
				{lastPosts.map((post) => (
					<article key={post.slug}>
						<h2>{post.title}</h2>
						<p>{post.date}</p>
						<Image
							src={`${directus.url}assets/${post.mainPicture.filename_disk}`}
							alt={post.mainPicture.title ?? ""}
							width={post.mainPicture.width ?? undefined}
							height={post.mainPicture.height ?? undefined}
						/>
					</article>
				))}
			</main>
		</div>
	);
}
