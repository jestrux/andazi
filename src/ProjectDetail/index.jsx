import { ArrowUpTrayIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import Scene from "./Scene";
import { Stage } from "./Player";
import ProjectProvider from "./ProjectContext/provider";
import { useProjectContext } from "./ProjectContext";

const ProjectDetailContent = () => {
	const { onScenesScreen, selectedScene } = useProjectContext();
	const navigate = useNavigate();

	const handleShare = async () => {
		// try {
		// 	const image = await fetch(project);
		// 	const blob = await image.blob();
		// 	const file = new File([blob], "image.jpg", { type: "image/jpeg" });
		// 	await navigator.share({ files: [file] });
		// 	console.log("Share was successful.");
		// } catch (error) {
		// 	console.log("Sharing failed", error);
		// }
	};

	return (
		<>
			<div className="nav-bar bg-card">
				<div className="h-14 p-3 border-b flex items-center">
					<button onClick={() => navigate("/", { replace: true })}>
						<ChevronLeftIcon width={24} strokeWidth={2.5} />
					</button>

					<div className="flex-1"></div>

					<button
						className="bg-gradient-to-br text-white from-[#8BC34A] to-[#4CAF50] h-9 flex items-center gap-2 rounded-full px-4"
						onClick={handleShare}
					>
						<ArrowUpTrayIcon
							className="mb-px"
							width={14}
							strokeWidth={3}
						/>
						<span className="mr-0.5">Share</span>
					</button>
				</div>
			</div>

			<div className="flex-1 flex items-stretch bg-canvas overflow-auto relative">
				<Stage />

				<div
					className={`${
						!onScenesScreen && "opacity-0 pointer-events-none"
					}  z-10 bg-card shadow-xl h-full w-full absolute overflow-hidden`}
				>
					{selectedScene && (
						<Scene
							key={selectedScene.id}
							{...selectedScene}
							className="absolute inset-6 border rounded-md"
						/>
					)}
				</div>
			</div>

			<div className="bottom-nav">
				<Outlet />
			</div>
		</>
	);
};

export default function ProjectDetail() {
	return (
		<ProjectProvider>
			<ProjectDetailContent />
		</ProjectProvider>
	);
}
