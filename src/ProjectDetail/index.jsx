import { useState } from "react";
import {
	ArrowUpTrayIcon,
	HomeIcon,
	MusicalNoteIcon,
	SignalIcon,
	RectangleStackIcon,
	SunIcon,
	ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";

const ProjectDetail = ({ project, onGoHome }) => {
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

	const handleSave = async () => {
		try {
			const image = await fetch(project);
			const blob = await image.blob();

			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "video.jpg";
			a.click();
			URL.revokeObjectURL(url);
		} catch (error) {
			console.log("Saving failed", error);
		}
	};

	return (
		<>
			<div className="nav-bar bg-white">
				<div className="h-14 p-3 border-b flex items-center">
					<button onClick={onGoHome}>
						<HomeIcon width={24} />
					</button>

					<div className="flex-1"></div>

					<button
						className="h-9 mr-2.5 bg-neutral-50 border border-neutral-300 flex items-center gap-2 rounded-full px-4"
						onClick={handleSave}
					>
						<ArrowDownTrayIcon
							className="mb-px"
							width={14}
							strokeWidth={2.5}
						/>
						<span className="mr-[0.1rem]">Save</span>
					</button>

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

			<div className="flex-1 flex items-center justify-center bg-neutral-200 overflow-auto px-4">
				<div className="w-full bg-white shadow rounded-lg text-left aspect-[1/1.5] relative overflow-hidden">
					<img
						className="absolute inset-0 w-full h-full object-cover"
						src={project}
						alt=""
					/>
				</div>
			</div>

			<div className="bottom-nav">
				<div className="h-14 py-1 bg-white border-t flex items-center gap-1">
					<button className="flex flex-col gap-0.5 items-center justify-center flex-1 flex-shrink-0">
						<RectangleStackIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Assets
						</span>
					</button>
					<button className="flex flex-col gap-0.5 items-center justify-center flex-1 flex-shrink-0">
						<SunIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Filters
						</span>
					</button>
					<button className="mb-0.5 mx-3 flex h-10 aspect-square rounded-full shadow-lg border border-neutral-200/60 items-center justify-center">
						<svg className="ml-0.5" width={20} viewBox="0 0 24 24">
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
								d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
								clipRule="evenodd"
								fill="url(#grad1)"
							/>
						</svg>
					</button>
					<button className="flex flex-col gap-0.5 items-center justify-center flex-1 flex-shrink-0">
						<MusicalNoteIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Music
						</span>
					</button>
					<button className="flex flex-col gap-0.5 items-center justify-center flex-1 flex-shrink-0">
						<SignalIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Animation
						</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default ProjectDetail;
