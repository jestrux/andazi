import { useProjectContext } from "../ProjectContext";
import BackToProjectButton from "../backToProjectButton";

export default function SceneMenu() {
	const { project, selectedScene, setSelectedScene } = useProjectContext();

	if (!project) return;

	return (
		<div className="bg-card border-t relative rounded-t-2xl">
			<div className="pl-4 pr-2 mt-2 flex items-center justify-between">
				<h3 className="text-lg/none font-bold">Scenes</h3>
				<BackToProjectButton />
			</div>
			<div className="py-3 px-4 flex items-center gap-3">
				{project.scenes.map((scene, index) => (
					<button
						className={`py-1 px-3 border rounded flex-1
						${selectedScene?.id == scene.id ? "bg-content text-card" : ""}
						`}
						to={index + 1}
						key={index}
						onClick={() => setSelectedScene(index)}
					>
						Scene {index + 1}
					</button>
				))}
			</div>
		</div>
	);
}
