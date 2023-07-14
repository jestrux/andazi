import { useEffect, useState } from "react";
import { ProjectContext } from "./";
import sampleProject from "./sample-project";
import { useAnimate } from "framer-motion";
import sequencer from "./sequencer";

export default function AppProvider({ children }) {
	const [animator, animate] = useAnimate();
	const [playing, setPlaying] = useState(false);
	const [currentScreen, setCurrentScreen] = useState("/");
	const [project, setProject] = useState(sampleProject);
	const [selectedSceneId, setSelectedScene] = useState(
		project?.scenes?.[0].id
	);
	const selectedScene = project?.scenes?.find(
		({ id }) => id == selectedSceneId
	);

	const updateSelectedScene = (newValues = {}) => {
		setProject((p) => {
			return {
				...p,
				scenes: p.scenes.map((scene) => {
					if (scene.id == selectedSceneId) {
						return {
							...scene,
							...newValues,
						};
					}

					return scene;
				}),
			};
		});
	};

	const clearAnimations = () => {
		if (animator.animations?.length) {
			animator.animations.forEach((a) => a.cancel());
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

	const togglePlay = playing ? stop : play;

	useEffect(() => {
		stop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [project, currentScreen]);

	return (
		<ProjectContext.Provider
			value={{
				project,
				currentScreen,
				setCurrentScreen,
				selectedScene,
				setSelectedScene,
				updateSelectedScene,
				playing,
				togglePlay,
				animator,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
}
