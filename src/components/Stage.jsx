import Scene from "./Scene";
import { useAppContext } from "../AppProvider";

export default function Stage() {
	const { project, animator, playing } = useAppContext();
	const scenes = project?.scenes || [];

	return (
		<div
			className="h-full w-full"
			style={
				!playing
					? {}
					: {
							// position: "fixed",
							// top: 0,
							// left: 0,
							// height: "100lvh",
							// width: "100vw",
					  }
			}
		>
			<div
				ref={animator}
				className="bg-canvas shadow-xl h-full w-full relative overflow-hidden"
			>
				{scenes.map((scene, i) => (
					<Scene
						key={i}
						{...scene}
						hideText
						className={`absolute inset-6
						${i == 0 ? "first-scene" : "opacity-0"}`}
					/>
					// ${ playing ? "inset-0" : "inset-6" }
				))}
			</div>
		</div>
	);
}
