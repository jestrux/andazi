import { useAppContext } from "../AppProvider";
import BottomSheet from "../components/BottomSheet";
import ReactTextareaAutosize from "react-textarea-autosize";
import ButtonGroup from "../components/ButtonGroup";
import {
	Bars3Icon,
	PaintBrushIcon,
	SignalIcon,
} from "@heroicons/react/24/outline";

const TextEditor = () => {
	const { writingText, setWritingText, selectedScene, updateSelectedScene } =
		useAppContext();

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
				<div className="mb-5 flex items-center">
					<button
						className="border h-8 flex items-center pt-px px-3 text-xs/none font-semibold rounded-full"
						onClick={() => setWritingText(true)}
					>
						Edit Text
					</button>

					{/* <div className="flex-1 flex mr-9 justify-center">
						<ButtonGroup
							choices={["top", "center", "bottom"]}
							value={selectedScene.text.placement || "top"}
							onChange={(placement) => updateText({ placement })}
						/>
					</div> */}

					<div className="ml-7 flex items-center gap-1.5">
						<PaintBrushIcon width={15} />

						<ButtonGroup
							choices={["outline", "solid", "filled", "inverted"]}
							value={selectedScene.text.style || "slide"}
							onChange={(style) => updateText({ style })}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2.5 pl-0.5">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-1.5">
							<Bars3Icon width={18} />

							<ButtonGroup
								choices={["top", "center", "bottom"]}
								value={selectedScene.text.placement || "top"}
								onChange={(placement) =>
									updateText({ placement })
								}
							/>
						</div>

						<div className="flex items-center gap-1.5">
							<SignalIcon width={18} />

							<ButtonGroup
								choices={["slide", "type", "swipe"]}
								value={selectedScene.text.animation || "slide"}
								onChange={(animation) =>
									updateText({ animation })
								}
							/>
						</div>
					</div>
				</div>
			</BottomSheet>
		</>
	);
};

export default TextEditor;
