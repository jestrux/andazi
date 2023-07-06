import {
	ArrowUpTrayIcon,
	MusicalNoteIcon,
	RectangleStackIcon,
	FolderOpenIcon,
	SwatchIcon,
	ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import Scene from "./Scene";
import { useRef, useState } from "react";

const ProjectDetail = () => {
	const {
		state: { project },
	} = useLocation();
	const scenes = [
		{
			image: project,
			text: "#AUTUMNING\nIN STYLE",
		},
		{
			image: "https://images.unsplash.com/photo-1538580619159-6c19131e1062?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDd8fGF1dHVtbnxlbnwwfHx8fDE2ODg1NDQzOTN8MA&ixlib=rb-4.0.3&q=80&w=600",
			clip: "circle",
		},
		{
			image: "https://images.unsplash.com/photo-1567584032175-e3605e93b056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDE0fHxhdXR1bW58ZW58MHx8fHwxNjg4NTQ0MzkzfDA&ixlib=rb-4.0.3&q=80&w=600",
			text: "LET'S HAVE US\nSOME FUN",
			clip: "circle",
		},
	];
	const [playing, setPlaying] = useState(false);
	const [currentScene, setCurrentScene] = useState(0);
	const navigate = useNavigate();
	const animators = useRef(Array(scenes.length).fill({}));

	const handleShare = async () => {
		try {
			const image = await fetch(project);
			const blob = await image.blob();
			const file = new File([blob], "image.jpg", { type: "image/jpeg" });
			await navigator.share({ files: [file] });
			console.log("Share was successful.");
		} catch (error) {
			console.log("Sharing failed", error);
		}
	};

	const handleAddAnimator = (index, animator) => {
		if (index > animators.current.length) animators.current.push({});
		animators.current[index] = animator;
	};

	const handlePlay = async () => {
		setPlaying(true);
		setCurrentScene(0);
		for (const animator of animators.current) {
			await animator();
			setCurrentScene((s) => s + 1);
		}
		setCurrentScene(0);
		setPlaying(false);
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

			<div className="flex-1 flex items-stretch bg-canvas overflow-auto p-6 relative">
				{scenes.map((scene, i) => (
					<Scene
						key={i}
						{...scene}
						hidden={currentScene < i}
						onInit={(fn) => handleAddAnimator(i, fn)}
					/>
				))}
			</div>

			<div className="bottom-nav">
				<div className="h-full py-1 bg-card border-t flex items-center gap-1">
					<button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<RectangleStackIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Scenes
						</span>
					</button>
					<button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<SwatchIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Theme
						</span>
					</button>
					<button
						className="mb-0.5 mx-3 flex h-12 aspect-square rounded-full shadow-lg bg-white/5 border border-neutral-200/50 dark:border-white/5 items-center justify-center"
						onClick={handlePlay}
					>
						<svg className={`${!playing && 'ml-0.5'} mt-px h-6`} viewBox="0 0 24 24">
							<defs>
								<linearGradient
									id="grad1"
									x1="0%"
									y1="0%"
									x2="100%"
									y2="0%"
								>
									<stop
										offset="0%"
										style={{
											stopColor: "#8BC34A",
											stopOpacity: 1,
										}}
									/>
									<stop
										offset="100%"
										style={{
											stopColor: "#4CAF50",
											stopOpacity: 1,
										}}
									/>
								</linearGradient>
							</defs>

							<path
								fillRule="evenodd"
								d={
									playing
										? "M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
										: "M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
								}
								clipRule="evenodd"
								fill="url(#grad1)"
							/>
						</svg>
					</button>
					<button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<MusicalNoteIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Music
						</span>
					</button>
					<button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<FolderOpenIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Assets
						</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default ProjectDetail;
