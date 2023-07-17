import { useEffect, useState } from "react";
import { ProjectContext } from "./";
import sampleProject from "./sample-project";
import { useAnimate } from "framer-motion";
import sequencer from "./sequencer";
import { useLocation, useNavigate } from "react-router-dom";
import useMusic from "../useMusic";

export default function AppProvider({ children }) {
	const [animator, animate] = useAnimate();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [playing, setPlaying] = useState(false);
	const [musicTrack, setMusicTrack] = useState(null);
	const { playing: playingMusic, playMusic, stopMusic } = useMusic();
	const [writingText, setWritingText] = useState(false);
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
		if (musicTrack) playMusic(musicTrack);
		// window.openFullscreen();
		animate(sequence).then(() => stop());
	};

	const stop = () => {
		clearAnimations();
		setPlaying(false);
		stopMusic();
	};

	const togglePlay = playing ? stop : play;

	// const closeBottomSheet = () =>
	// 	sceneId ? navigate("/", { replace: true }) : setWritingText("/");
	const closeBottomSheet = () => {
		navigate(["/scenes", "/music"].includes(pathname) ? "/" : "/scenes", {
			replace: true,
		});
	};

	useEffect(() => {
		stop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [project, writingText]);

	useEffect(() => {
		if (pathname.indexOf("scenes") == -1)
			setSelectedScene(project?.scenes?.[0].id);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<ProjectContext.Provider
			value={{
				project,
				writingText,
				setWritingText,
				musicTrack,
				setMusicTrack,
				playingMusic,
				playMusic,
				stopMusic,
				selectedScene,
				setSelectedScene,
				updateSelectedScene,
				playing,
				togglePlay,
				animator,
				closeBottomSheet,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
}
