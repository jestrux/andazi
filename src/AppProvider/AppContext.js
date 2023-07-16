import { createContext, useContext } from "react";

export const ProjectContext = createContext({
	project: null,
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
	animator: null,
	closeBottomSheet: () => {},
});

export const useAppContext = () => {
	return useContext(ProjectContext);
};
