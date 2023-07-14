import { useAnimate } from "framer-motion";
import Scene from "../Scene";
import { useEffect, useState } from "react";
import sequencer from "./sequencer";
import { useProjectContext } from "../ProjectContext";

export default function usePlayer() {
	const { project } = useProjectContext();
	const scenes = project?.scenes || [];
	const [animator, animate] = useAnimate();
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		if (playing && animator.animations?.length)
			return animator.animations[0].cancel();

		setPlaying(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [project]);

	const handlePlay = async () => {
		if (playing && animator.animations?.length)
			return animator.animations[0].cancel();

		if (animator.animations?.length) {
			animator.animations.forEach((a) => a.complete());
			animator.animations = [];
		}

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

		setPlaying(true);
		animate(sequence).then(() => setPlaying(false));
	};

	const PlayButton = () => (
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
							? "M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
							: "M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
					}
					clipRule="evenodd"
					fill="url(#grad1)"
				/>
			</svg>
		</button>
	);

	const Stage = () => (
		<div
			ref={animator}
			className="bg-card shadow-xl h-full w-full relative overflow-hidden"
		>
			{scenes.map((scene, i) => (
				<Scene
					key={i}
					{...scene}
					hideText
					className={`absolute inset-6 ${
						i == 0 ? "first-scene" : "opacity-0"
					}`}
				/>
			))}
		</div>
	);

	return {
		Stage,
		PlayButton,
	};
}
