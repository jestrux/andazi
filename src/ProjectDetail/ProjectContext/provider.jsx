import { useState } from "react";
import { ProjectContext } from "./index";
import sampleProject from "../../sample-project";
import { useLocation } from "react-router-dom";

export default function ProjectProvider({ children }) {
	const { state, pathname } = useLocation();
	const [project] = useState(state?.project || sampleProject);
	const onScenesScreen = pathname.includes("scenes");
	const [_selectedSceneIndex, setSelectedScene] = useState(0);
	const selectedScene = project?.scenes?.[_selectedSceneIndex];

	return (
		<ProjectContext.Provider
			value={{ project, onScenesScreen, selectedScene, setSelectedScene }}
		>
			{children}
		</ProjectContext.Provider>
	);
}
