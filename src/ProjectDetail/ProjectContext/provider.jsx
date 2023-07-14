import { useEffect, useState } from "react";
import { ProjectContext } from "./index";
import sampleProject from "../../sample-project";
import { useLocation } from "react-router-dom";
import { useAnimate } from "framer-motion";
import sequencer from "../Player/sequencer";

export default function ProjectProvider({ children }) {
	const [animator, animate] = useAnimate();
	const [playing, setPlaying] = useState(false);
	const { state, pathname } = useLocation();
	const [project] = useState(state?.project || sampleProject);
	const onScenesScreen = pathname.includes("scenes");
	const [_selectedSceneIndex, setSelectedScene] = useState(0);
	const selectedScene = project?.scenes?.[_selectedSceneIndex];

	const clearAnimations = () => {
		if (animator.animations?.length) {
			animator.animations.forEach((a) => a.cancel());

			// animator.animations.forEach((a) => a.complete());
			animator.animations = [];
		}
	};

	const play = () => {
		clearAnimations();

		const scenes = project?.scenes ?? [];
		const sequence = [
			...scenes
				.map((scene, index) =>
					sequencer({
						scene,
						index,
						lastSceneDuration: scenes[index - 1]?.duration,
					})
				)
				.flat(),
			[".first-scene", { opacity: 1 }, { duration: 0.000001, at: "<" }],
		];

		setPlaying(true);
		animate(sequence).then(() => setPlaying(false));
	};

	const stop = () => {
		clearAnimations();
		setPlaying(false);
	};

	const togglePlay = () => {
		if (playing) return stop();

		play();
	};

	useEffect(() => {
		stop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [project, pathname]);

	return (
		<ProjectContext.Provider
			value={{
				project,
				onScenesScreen,
				selectedScene,
				setSelectedScene,
				playing,
				togglePlay,
				animator,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
}
