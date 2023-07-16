import { createContext, useContext } from "react";

export const ProjectContext = createContext({
	project: null,
	scenes: [],
	writingText: false,
	setWritingText: () => {},
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
