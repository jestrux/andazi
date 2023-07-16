import { useEffect, useState } from "react";
import { useAppContext } from "../AppProvider";
import ColorPicker from "../components/ColorPicker";
import GradientPicker from "../components/GradientPicker";
import { parseColor } from "../utils";

const BackgroundEditor = () => {
	const { selectedScene, updateSelectedScene } = useAppContext();
	const _value = selectedScene.background;
	const isGradient =
		_value && _value?.toString().indexOf("linear-gradient") != -1;
	const [colorType, setColorType] = useState(
		isGradient ? "Gradient" : "Solid Color"
	);
	const value = !_value
		? null
		: !isGradient
		? _value
		: _value
				.replace("linear-gradient(90deg,", "")
				.replace(")", "")
				.replace(" 0%", "")
				.replace(" 50%", "")
				.replace(" 100%", "")
				.split(",")
				.map((entry) => entry.trim());

	const handleChange = (value) => {
		updateSelectedScene({
			background: parseColor(value),
		});
	};

	useEffect(() => {
		if (colorType == "Gradient" && !isGradient)
			handleChange(["#d53369", "#daae51"]);
		if (colorType == "Solid Color" && isGradient) handleChange("#7679EE");

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colorType]);

	return (
		<div className="">
			<h3 className="mb-4 text-lg/none font-semibold ml-0.5">
				Edit background
			</h3>

			<div className="mb-3 flex items-center gap-3">
				{["Solid Color", "Gradient"].map((type, index) => (
					<button
						className={`py-1 px-3 border rounded
						${colorType == type ? "bg-content text-card" : ""}
						`}
						to={index + 1}
						key={index}
						onClick={() => setColorType(type)}
					>
						{type}
					</button>
				))}
			</div>

			<div className="mb-8">
				{colorType == "Solid Color" ? (
					<ColorPicker
						className="text-black"
						value={value}
						onChange={handleChange}
					/>
				) : (
					<GradientPicker value={value} onChange={handleChange} />
				)}
			</div>
		</div>
	);
};

export default BackgroundEditor;
