import { getAllPosts, getAllTags } from "@/actions/postsActions";
import { REVALIDATE_TIME } from "@/publicConfig";
import Link from "next/link";

/**
 * Revalidate time in seconds
 */
export const revalidate = REVALIDATE_TIME;

/**
 * Main Menu Page component
 */
export default async function MainMenuPage() {
	const allPosts = await getAllPosts();
	const allTags = await getAllTags();

	return (
		<main>
			<h1>Main Menu</h1>
			<nav>
				<h2>Tags</h2>
				<ul>
					{allTags.map((tag) => (
						<li key={tag}>
							<Link href={`/tag/${encodeURIComponent(tag)}`}>{tag}</Link>
						</li>
					))}
				</ul>
			</nav>
			<nav>
				<h2>Posts</h2>
				<ul>
					{allPosts.map((post) => (
						<li key={post.slug}>
							<Link href={`/post/${post.slug}`}>{post.title}</Link>
						</li>
					))}
				</ul>
			</nav>
		</main>
	);
}
