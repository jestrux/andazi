import { Link, Outlet, useParams } from "react-router-dom";
import { useAppContext } from "../../AppProvider";
import BottomSheet from "../BottomSheet";
import { parseColor } from "../../utils";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function SceneMenu() {
	const { sceneId } = useParams();
	const { project, selectedScene, setSelectedScene } = useAppContext();

	return (
		<>
			{!sceneId && (
				<BottomSheet>
					<div className="flex items-center gap-1.5">
						{project.scenes.map((scene, index) => (
							<button
								className={`h-12 flex items-center justify-center px-5 border-2 rounded-md
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

					<div className="mt-3 flex items-center gap-5">
						<Link
							className="ml-px w-9 h-9 rounded-full border-2"
							to={`${selectedScene.id}/edit-background`}
							style={{
								background: parseColor(
									selectedScene.background
								),
							}}
						></Link>

						<Link
							className="h-9 w-10 flex items-center justify-center border bg-content/5 rounded"
							to={`${selectedScene.id}/edit-image`}
						>
							<PhotoIcon className="w-6" strokeWidth={2} />
						</Link>

						<Link
							className="h-9 w-10 flex items-center justify-center border bg-content/5 rounded"
							to={`${selectedScene.id}/edit-text`}
						>
							<span className="text-2xl/none font-medium">A</span>
						</Link>
					</div>
				</BottomSheet>
			)}

			<Outlet />
		</>
	);
}
