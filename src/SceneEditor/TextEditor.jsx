import { useAppContext } from "../AppProvider";
import BottomSheet from "../components/BottomSheet";
import ReactTextareaAutosize from "react-textarea-autosize";
import ButtonGroup from "../components/ButtonGroup";
import { textAnimation } from "../AppProvider/sequencer";

const TextEditor = () => {
	const {
		writingText,
		setWritingText,
		selectedScene,
		updateSelectedScene,
		animateEditor,
	} = useAppContext();

	const updateText = (updatedValue) => {
		updateSelectedScene({
			text: { ...(selectedScene.text || {}), ...updatedValue },
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

	const handleAnimationChanged = (animation) => {
		animateEditor([
			...textAnimation({
				id: "editorScene",
				text: {
					...selectedScene.text,
					animation,
				},
				duration: 3,
			}),
		]);

		updateText({ animation });
	};

	return (
		<>
			{writingText && (
				<div className="bottom-nav z-[100] fixed inset-0 bg-black/30 flex items-start justify-center px-6 pt-24">
					<ReactTextareaAutosize
						autoFocus
						className="bg-transparent text-white w-full rounded pointer-events-auto text-center text-3xl/relaxed font-bold focus:outline-none"
						style={{ textShadow: "1px 1px rgba(0,0,0,0.2)" }}
						value={selectedScene.text?.content}
						onChange={(e) =>
							updateText({ content: e.target.value })
						}
						onFocus={handleFocus}
						onBlur={() => setWritingText(false)}
					/>
				</div>
			)}

			<BottomSheet>
				<div className="flex flex-col gap-2.5 pl-1">
					<div className="-ml-1 flex items-center">
						<button
							className="border h-8 flex items-center pt-px px-3 text-sm/none font-semibold rounded-full"
							onClick={() => setWritingText(true)}
						>
							Edit Text
						</button>
					</div>

					<div className="flex items-center justify-between gap-2">
						<span className="tex-sm/none">Placement</span>

						<ButtonGroup
							choices={["top", "center", "bottom"]}
							value={selectedScene.text.placement || "top"}
							onChange={(placement) => updateText({ placement })}
						/>
					</div>

					<div className="flex items-center justify-between gap-2">
						<span className="tex-sm/none">Animation</span>

						<ButtonGroup
							choices={["swing", "slide", "appear", "swipe"]}
							value={selectedScene.text.animation || "slide"}
							onChange={(animation) =>
								handleAnimationChanged(animation)
							}
						/>
					</div>

					<div className="flex items-center justify-between gap-2">
						<span className="tex-sm/none">Colors</span>

						<ButtonGroup
							choices={["transparent", "black", "white"]}
							value={selectedScene.text.colors || "black"}
							onChange={(colors) => updateText({ colors })}
						/>
					</div>
				</div>
			</BottomSheet>
		</>
	);
};

export default TextEditor;
