import { useEffect, useState } from "react";
import { Saturation, ColorWrap, Hue } from "react-color/lib/components/common";
import PhotoshopPointerCircle from "react-color/lib/components/photoshop/PhotoshopPointerCircle";
import { toState } from "react-color/lib/helpers/color";

const Picker = () => {
	return (
		<div
			style={{
				width: "18px",
				height: "18px",
				borderRadius: "50%",
				transform: "translate(-9px, 0.5px)",
				backgroundColor: "rgb(248, 248, 248)",
				boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)",
			}}
		>
			&nbsp;
		</div>
	);
};

let ColorPickerComponent = (props) => {
	const handleChange = ({ h }, e) => {
		props.onChange(toState({ ...props.hsl, h }), e);
	};

	return (
		<div
			className="w-full flex flex-col gap-3 p-3 rounded-lg border overflow-hidden"
			style={{ height: "290px" }}
		>
			<div className="flex-1 w-full overflow-hidden relative">
				<Saturation
					{...props}
					radius={8}
					color={{ hsl: props.hsl }}
					pointer={PhotoshopPointerCircle}
				/>
			</div>

			<div
				className="h-5 w-full relative"
				style={{
					borderRadius: 12,
				}}
			>
				<Hue
					radius={6}
					pointer={Picker}
					hsl={props.hsl}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

ColorPickerComponent = ColorWrap(ColorPickerComponent);

export default function ColorPicker({
	value = "#ff0000",
	onChange = () => {},
}) {
	const [color, setColor] = useState({ hex: value });
	useEffect(() => {
		if (value != color.hex) setColor({ hex: value });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const handleChange = (color) => {
		setColor(color);
		onChange(color.hex);
	};

	return <ColorPickerComponent color={color} onChange={handleChange} />;
}