import { useEffect, useState } from "react";
import { ProjectContext } from "./";
import sampleProject from "./sample-project";
import { useAnimate } from "framer-motion";
import sequencer from "./sequencer";
import { useLocation, useNavigate } from "react-router-dom";
import useMusic from "../useMusic";
import { themes } from "../utils";

export default function AppProvider({ children }) {
	const [cardDetails, setCardDetails] = useState({
		theme: themes.burgundy,
		guest: {
			code: "276033",
			name: "Mr. Chris Bajire",
			cardType: "Single",
		},
		template: {
			groom: "James",
			bride: "Audrey",
			bibleVerse: "Proverbs 18:22",
			date: "10th July",
			parents: "Mr. and Mrs. Hamand Kisiye",
			churchTime: "10:00 AM",
			churchLocation: "KKKT Chang'ombe Mabatini",
			receptionTime: "07:30 PM",
			receptionLocation: "Police Mess ( Oyster Bay )",
			dressCode: "party decent wear",
			themeColor: "burgundy",
			contacts: [
				{ name: "Francis Chami", phoneNumber: "0721 011 990" },
				{ name: "Ruth Mkwape", phoneNumber: "0797 210 173" },
				{ name: "Danford Kisiye", phoneNumber: "0711 602 000" },
			],
		},
	});
	const theme = cardDetails.theme;
	const guest = cardDetails.guest;
	const template = cardDetails.template;
	const [editorAnimator, animateEditor] = useAnimate();
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

	const updateTemplate = (newValues = {}) => {
		setCardDetails((cardDetails) => ({
			...cardDetails,
			template: {
				...cardDetails.template,
				...newValues,
			},
		}));
	};

	const updateTheme = (newValues = {}) => {
		setCardDetails((cardDetails) => ({
			...cardDetails,
			theme: {
				...cardDetails.theme,
				...newValues,
			},
		}));
	};

	const updateGuest = (newValues = {}) => {
		setCardDetails((cardDetails) => ({
			...cardDetails,
			guest: {
				...cardDetails.guest,
				...newValues,
			},
		}));
	};

	const selectedScene = project?.scenes?.find(
		({ id }) => id == selectedSceneId
	);

	const updateProject = (newValues = {}) => {
		setProject((p) => ({
			...p,
			...newValues,
		}));
	};

	const updateSelectedScene = (newValues = {}) => {
		updateProject({
			scenes: project.scenes.map((scene) => {
				if (scene.id == selectedSceneId) {
					return {
						...scene,
						...newValues,
					};
				}

				return scene;
			}),
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
		// let backPath = ["/scenes", "/music"].includes(pathname)
		// 	? "/"
		// 	: "/scenes";
		let backPath = "/";

		if (pathname.indexOf("edit-image/search") != -1)
			backPath = pathname.replace("search", "");

		navigate(backPath, {
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
				template,
				updateTemplate,
				theme,
				updateTheme,
				guest,
				updateGuest,
				project,
				updateProject,
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
				editorAnimator,
				animateEditor,
				animator,
				animate,
				closeBottomSheet,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
}
