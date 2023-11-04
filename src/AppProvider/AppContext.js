import { createContext, useContext } from "react";

export const ProjectContext = createContext({
	project: null,
	updateProject: () => {},
	scenes: [],
	writingText: false,
	setWritingText: () => {},
	musicTrack: false,
	setMusicTrack: () => {},
	playingMusic: false,
	playMusic: () => {},
	stopMusic: () => {},
	selectedScene: null,
	setSelectedScene: () => {},
	updateSelectedScene: () => {},
	playing: false,
	togglePlay: () => {},
	editorAnimator: null,
	animateEditor: () => {},
	animator: null,
	animate: () => {},
	closeBottomSheet: () => {},
});

export const useAppContext = () => {
	return useContext(ProjectContext);
};
