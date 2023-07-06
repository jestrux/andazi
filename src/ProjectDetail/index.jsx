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
import { useState } from "react";
import { stagger, useAnimate } from "framer-motion";

const randomId = () => Math.random().toString(36).slice(2);
const defaultSceneDuration = 3;

const sequencer = ({ scene, index, lastSceneDuration }) => {
	const {
		id,
		text,
		duration = defaultSceneDuration,
		clip,
		dimensions,
	} = scene;
	// const radius =
	// 	Math.max(dimensions.width ?? 200, dimensions.height ?? 200) * 3;
	// const clipAnimation = !scene.clip
	// 	? []
	// 	: [`#${id} #${clip}Clip`, { r: [0, radius] }, { duration: 1.5 }];

	const isFirstScene = index == 0;
	const fadeInDuration = 0.00002;

	const fadeInAnimation = [
		`#${id}`,
		{ opacity: 1 },
		{
			duration: isFirstScene ? 0.001 : fadeInDuration,
			...(isFirstScene
				? {}
				: {
						at: `image-${index - 1}`,
						delay: lastSceneDuration ?? defaultSceneDuration,
				  }),
		},
	];
	const imageAnimation = [
		`#${id} #image`,
		{ opacity: 1, scale: [1, 1.2] },
		{
			duration,
		},
	];
	const textAnimation = () => {
		if (text?.animation == "type") {
			return [
				[
					`#${id} li`,
					{ opacity: 1 },
					{
						at: "<",
						duration: 0.00001,
					},
				],
				[
					`#${id} li div`,
					{ opacity: [0, 1], scale: [0, 1], skewX: [0, 6] },
					{
						at: "<",
						type: "spring",
						duration: 1.5,
						delay: stagger(0.08),
					},
				],
				[
					`#${id} small`,
					{ opacity: [0, 1], y: [20, 0], scale: [1.2, 1] },
					{
						at: "<",
						type: "spring",
						duration: 1,
						delay: stagger(0.02),
					},
				],
			];
		}

		if (text?.animation == "swipe") {
			return [
				[
					`#${id} li`,
					{ opacity: [0, 1], x: [-80, 0] },
					{
						at: `-${duration - 0.3}`,
						type: "spring",
						bounce: 0.5,
						delay: stagger(0.1),
						duration: 1,
					},
				],
			];
		}

		return [
			[
				`#${id} li`,
				{ opacity: [0, 1], y: [40, 0] },
				{
					at: `-${duration - 0.3}`,
					type: "spring",
					bounce: 0.35,
					delay: stagger(0.1),
					duration: 1,
				},
			],
		];
	};
	const fadeOutAnimation = [
		`#${id}, #${id} li`,
		{ opacity: 0 },
		{
			at: `+${duration * 0.8}`,
			duration: 0.001,
		},
	];

	return [
		fadeInAnimation,
		`image-${index}`,
		imageAnimation,
		...(text ? [...textAnimation()] : []),
		fadeOutAnimation,
	];
};

const ProjectDetail = () => {
	const {
		state: { project },
	} = useLocation();
	const [scenes] = useState([
		{
			id: "scene" + randomId(),
			image: { url: project },
			text: {
				content: "AUTUMN'S BAACK!!!",
				animation: "type",
			},
		},
		{
			id: "scene" + randomId(),
			text: {
				content: "WITH FLOWERS\nAND SUN",
				placement: "bottom",
				animation: "swipe",
			},
			image: {
				url: "https://images.unsplash.com/photo-1538580619159-6c19131e1062?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDd8fGF1dHVtbnxlbnwwfHx8fDE2ODg1NDQzOTN8MA&ixlib=rb-4.0.3&q=80&w=600",
			},
			clip: "circle",
		},
		{
			id: "scene" + randomId(),
			image: {
				url: "https://images.unsplash.com/photo-1567584032175-e3605e93b056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDE0fHxhdXR1bW58ZW58MHx8fHwxNjg4NTQ0MzkzfDA&ixlib=rb-4.0.3&q=80&w=600",
			},
			text: {
				content: "LET'S HAVE US\nSOME FUN",
				placement: "center",
			},
			clip: "circle",
		},
	]);
	const navigate = useNavigate();
	const [animator, animate] = useAnimate();

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

	const handlePlay = async () => {
		if (animator.animations?.length) animator.animations = [];

		const sequence = [
			...scenes
				.map((scene, index) =>
					sequencer({
						scene,
						index,
						lastSceneDuration: scenes[index - 1]?.duration,
					})
				)
				.flat(),
			[".first-scene", { opacity: 1 }, { duration: 0.000001, at: "<" }],
		];
		console.log("Sequence", sequence);
		animate(sequence);
	};

	const playing = animator.animations.length
		? !animator.animations[0].complete
		: false;

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
				<div
					ref={animator}
					className="bg-card shadow-xl h-full w-full relative overflow-hidden"
				>
					{scenes.map((scene, i) => (
						<Scene
							key={i}
							{...scene}
							className={i == 0 ? "first-scene" : "opacity-0"}
						/>
					))}
				</div>
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
						<svg
							className={`${!playing && "ml-0.5"} mt-px h-6`}
							viewBox="0 0 24 24"
						>
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
