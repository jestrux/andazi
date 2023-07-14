import { createContext, useContext } from "react";

export const ProjectContext = createContext({
	project: null,
	onScenesScreen: false,
	scenes: [],
	selectedScene: null,
	setSelectedScene: () => {},
});

export const useProjectContext = () => {
	return useContext(ProjectContext);
};
