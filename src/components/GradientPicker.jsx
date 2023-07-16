import { useEffect, useState, Fragment } from "react";
import tinycolor from "tinycolor2";
import { motion } from "framer-motion";

const gradients = {
	Butterbeer: ["#d53369", "#daae51"],
	"Purple Rain": ["#FC466B", "#3F5EFB"],
	Valhalla: ["#C4FCB6", "#FDAFEE"],
	Rivendell: ["#e3ffe7", "#d9e7ff"],
	"Vicki Vale": ["#FFD4A2", "#ECE6FF"],
	Vibranium: ["#A48AD9", "#453279"],
	"Fancy Maps": ["#1CB5E0", "#000851"],
	Winterfell: ["#FDBB2D", "#22C1C3"],
	"Mosby Boys": ["#0700b8", "#00ff88"],
	"The Dundies": ["#BF953F", "#FCF6BA", "#AA771C"],
	"New 1": ["#F06966", "#FAD6A6"],
	"New 3": ["#9055FF", "#13E2DA"],
	"New 4": ["#D6FF7F", "#00B3CC"],
	"New 5": ["#E233FF", "#FF6B00"],
	"New 6": ["#ED7B84", "#9055FF"],
	"New 7": ["#402565", "#30BE96"],
	"New 8": ["#CB5EEE", "#4BE1EC"],
	"New 9": ["#737DFE", "#FFCAC9"],
	"New 10": ["#2F80ED", "#B2FFDA"],
};

const hexAverage = (...args) => {
	return args
		.map((arg) => new tinycolor(arg).toHex())
		.reduce(
			function (previousValue, currentValue) {
				return currentValue
					.replace(/^#/, "")
					.match(/.{2}/g)
					.map(function (value, index) {
						return previousValue[index] + parseInt(value, 16);
					});
			},
			[0, 0, 0]
		)
		.reduce(function (previousValue, currentValue) {
			return (
				previousValue +
				Math.floor(currentValue / args.length)
					.toString(16)
					.padStart(2, "0")
			);
		}, "#");
};

export default function GradientPicker(props) {
	const defaultValue = Object.values(gradients)[0];
	const valueProp = !Array.isArray(props.value)
		? defaultValue
		: props.value || defaultValue;
	const [, setColor] = useState(valueProp);
	const [shiftHeld, setShiftHeld] = useState(false);
	const [_value, setValue] = useState(valueProp);

	const onChange = (color) => {
		setColor(color);
		setValue(color);
		props.onChange(color);
	};

	const handleSetValue = (value) => {
		setValue(value);
		if (typeof onChange == "function") onChange(value);
	};

	const updateColor = (e) => {
		const { value: val, name } = e.target || { name: e };
		let newValue;

		if (["new", "remove"].includes(name)) {
			newValue = [..._value];
			if (name == "new") newValue.splice(1, 0, val);
			else newValue.splice(1, 1);
		} else {
			newValue =
				Array.isArray(_value) &&
				_value.map((color, i) => {
					if (i == name) return val;
					return color;
				});
		}

		handleSetValue(newValue);
	};

	const handleShiftPress = (e) => setShiftHeld(e.shiftKey);

	useEffect(() => {
		document.addEventListener("keyup", handleShiftPress, false);
		document.addEventListener("keydown", handleShiftPress, false);

		return () => {
			document.removeEventListener("keydown", handleShiftPress, false);
			document.removeEventListener("keyup", handleShiftPress, false);
		};
	}, []);

	return (
		<div
			className="p-1.5 border rounded flex items-center justify-between"
			style={{ height: "48px" }}
		>
			{Array.isArray(_value) &&
				_value.map((color, index) => {
					const label = (color, index) => {
						const removeMidColor = _value.length == 3 && index == 1;

						return (
							<motion.label
								drag="x"
								dragConstraints={{
									left: 0,
									right: 0,
								}}
								dragElastic={removeMidColor ? 0.05 : 0}
								onPanEnd={
									removeMidColor
										? () => updateColor("remove")
										: null
								}
								onClick={
									removeMidColor && shiftHeld
										? (e) => {
												e.preventDefault();
												updateColor("remove");
										  }
										: null
								}
								className="cursor-pointer h-full aspect-video rounded-md border flex items-center justify-center"
								style={{
									background: index == "new" ? "" : color,
								}}
							>
								<input
									className="absolute opacity-0"
									style={{
										width: 0,
										height: 0,
									}}
									type="color"
									value={color}
									name={index}
									onChange={updateColor}
								/>

								{(index == "new" || removeMidColor) && (
									<svg
										className="opacity-50"
										width={12}
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={3}
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d={
												index == "new"
													? "M12 4.5v15m7.5-7.5h-15"
													: "M19.5 12h-15"
											}
										/>
									</svg>
								)}
							</motion.label>
						);
					};

					return (
						<Fragment key={index}>
							{label(color, index)}
							{index == 0 &&
								_value.length == 2 &&
								label(hexAverage(_value[0], _value[1]), "new")}
						</Fragment>
					);
				})}
		</div>
	);
}
