import { useEffect, useState } from "react";
import { useAppContext } from "../AppProvider";
import GradientPicker from "../components/GradientPicker";
import { parseColor } from "../utils";
import BottomSheet from "../components/BottomSheet";

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
		<BottomSheet>
			<h3 className="mb-4 text-lg/none font-semibold ml-0.5">
				Edit background
			</h3>

			<div className="mt-5">
				{colorType == "Solid Color" ? (
					<div
						className="relative block rounded border p-1.5"
						style={{ height: "48px" }}
					>
						<label
							className="block h-full rounded-sm"
							style={{ background: value }}
						>
							<input
								type="color"
								className="absolute top-0 opacity-0 pointer-events-none"
								onChange={(e) => handleChange(e.target.value)}
							/>
						</label>
					</div>
				) : (
					<GradientPicker value={value} onChange={handleChange} />
				)}
			</div>

			<div className="-mb-4 mt-4 flex items-center justify-center">
				{["Solid Color", "Gradient"].map((type, index) => (
					<button
						className={`h-8 px-4 text-sm font-semibold rounded-full
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
		</BottomSheet>
	);
};

export default BackgroundEditor;
