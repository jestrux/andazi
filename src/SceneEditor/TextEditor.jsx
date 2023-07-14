import { useAppContext } from "../AppProvider";

const TextEditor = () => {
	const { selectedScene, updateSelectedScene } = useAppContext();
	const updateText = (content) => {
		updateSelectedScene({
			text: { ...(selectedScene.text || {}), content },
		});
	};

	return (
		<div className="">
			<h3 className="mb-4 text-lg/none font-semibold ml-0.5">
				Edit Text
			</h3>

			<textarea
				className="bg-transparent w-full border py-2 px-3 rounded"
				value={selectedScene.text?.content}
				onChange={(e) => updateText(e.target.value)}
			/>
		</div>
	);
};

export default TextEditor;
