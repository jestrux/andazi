import { useAppContext } from "../AppProvider";

const BackgroundEditor = () => {
	const { selectedScene, updateSelectedScene } = useAppContext();

	return (
		<div className="">
			<h3 className="mb-4 text-lg/none font-semibold ml-0.5">
				Edit background
			</h3>

			<input
				type="color"
				value={selectedScene.background}
				onChange={(e) =>
					updateSelectedScene({ background: e.target.value })
				}
			/>
		</div>
	);
};

export default BackgroundEditor;
