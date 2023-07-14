import { useAppContext } from "../AppProvider";

export default function PlayButton() {
	const { togglePlay, playing } = useAppContext();

	return (
		<button
			className="mt-0.5 mx-3 flex h-12 aspect-square rounded-full shadow-lg bg-white/5 border border-neutral-200/50 dark:border-white/5 items-center justify-center"
			onClick={togglePlay}
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
}
