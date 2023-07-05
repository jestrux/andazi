import { useState } from "react";
import Projects from "./Projects";
import ProjectDetail from "./ProjectDetail";

function App() {
	const [project, setProject] = useState(null);

	return (
		<div id="appWrapper" className="flex flex-col">
			{!project && <Projects onSelect={setProject} />}
			{project && (
				<ProjectDetail
					project={project}
					onGoHome={() => setProject(null)}
				/>
			)}
		</div>
	);
}

export default App;
