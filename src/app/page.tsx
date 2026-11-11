import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import MainHero from "@/components/MainHero/MainHero";
import PostPreviewList from "@/components/PostPreviewUi/PostPreviewList/PostPreviewList";
import { getLastPosts } from "@/content";
import style from "./page.module.css";

/**
 * Home Page component
 */
export default function Home() {
	const lastPosts = getLastPosts(4);

	return (
		<div className={style.wrapper}>
			<MainHero className={style.hero} />
			<AnimatedTitle
				className={style.subtitle}
				type="h2"
				motionInitialDelay={0.2}
			>
				Derniers posts
			</AnimatedTitle>
			<PostPreviewList posts={lastPosts} motionInitialDelay={0.3} />
		</div>
	);
}
