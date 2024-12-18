import { getLastPosts } from "@/actions/postsActions";
import MainHero from "@/components/MainHero/MainHero";
import PostPreviewList from "@/components/PostPreviewList/PostPreviewList";
import { REVALIDATE_TIME } from "@/publicConfig";
import style from "./page.module.css";

/**
 * Revalidate time in seconds
 */
export const revalidate = REVALIDATE_TIME;
/**
 * Home Page component
 */
export default async function Home() {
	const lastPosts = await getLastPosts(4);

	return (
		<div className={style.wrapper}>
			<MainHero className={style.hero} />
			<PostPreviewList posts={lastPosts} />
		</div>
	);
}
