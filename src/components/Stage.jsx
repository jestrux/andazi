import Scene from "./Scene";
import { useAppContext } from "../AppProvider";

export default function Stage() {
	const { project, animator } = useAppContext();
	const scenes = project?.scenes || [];

	return (
		<div
			ref={animator}
			className="bg-canvas shadow-xl h-full w-full relative overflow-hidden"
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
}
