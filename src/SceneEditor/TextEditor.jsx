import { useAppContext } from "../AppProvider";
import BottomSheet from "../components/BottomSheet";
import ReactTextareaAutosize from "react-textarea-autosize";

const TextEditor = () => {
	const { selectedScene, updateSelectedScene, closeBottomSheet } =
		useAppContext();
	const updateText = (content) => {
		updateSelectedScene({
			text: { ...(selectedScene.text || {}), content },
		});
	};

	const handleFocus = (e) => {
		const value = e.target.value;
		e.target.value = "";
		const lines = value.split("\n").length;

		e.target.style.minBlockSize = `${45 * lines}px`;

		setTimeout(() => {
			e.target.value = value;
		});
	};

	return (
		<>
			<div className="bottom-nav z-[100] pointer-events-none fixed inset-0 bg-black/30 flex items-start justify-center px-6 pt-24">
				<ReactTextareaAutosize
					autoFocus
					className="bg-transparent text-white w-full rounded pointer-events-auto text-center text-3xl/relaxed font-bold focus:outline-none"
					style={{ textShadow: "1px 1px rgba(0,0,0,0.2)" }}
					value={selectedScene.text?.content}
					onChange={(e) => updateText(e.target.value)}
					onFocus={handleFocus}
					onBlur={closeBottomSheet}
				/>
			</div>

			<BottomSheet>
				<h3 className="mb-4 text-lg/none font-semibold ml-0.5">
					Edit Text
				</h3>
			</BottomSheet>
		</>
	);
};

export default TextEditor;
