import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../AppProvider";
import BackToProjectButton from "../backToProjectButton";
import { motion } from "framer-motion";

export default function SceneMenu() {
	const { sceneId } = useParams();
	const { project, selectedScene, setSelectedScene } = useAppContext();

	return (
		<>
			{!sceneId && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					className="bg-card border-t relative rounded-t-2xl"
				>
					<div className="absolute right-2 top-2">
						<BackToProjectButton />
					</div>

					<div className="border-b p-4 flex items-center gap-3">
						<Link
							className="py-1 px-3 border rounded"
							to={`${selectedScene.id}/edit-background`}
						>
							Background
						</Link>

						<Link
							className="py-1 px-3 border rounded"
							to={`${selectedScene.id}/edit-image`}
						>
							Image
						</Link>

						<Link
							className="py-1 px-3 border rounded"
							to={`${selectedScene.id}/edit-text`}
						>
							Text
						</Link>
					</div>

					<div className="p-3 flex items-center gap-3">
						{project.scenes.map((scene, index) => (
							<button
								className={`py-1 px-3 border rounded
						${selectedScene?.id == scene.id ? "bg-content text-card" : ""}
						`}
								to={index + 1}
								key={index}
								onClick={() => setSelectedScene(scene.id)}
							>
								Scene {index + 1}
							</button>
						))}
					</div>
				</motion.div>
			)}
		</>
	);
}
