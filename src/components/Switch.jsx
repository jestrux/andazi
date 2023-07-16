import { useState } from "react";

const Switch = ({ value: _value, label, onChange = () => {} }) => {
	const [value, setValue] = useState(_value);
	const handleChange = (val) => {
		setValue(val);
		onChange(val);
	};

	return (
		<label
			className="inline-flex cursor-pointer justify-start items-center first-letter:uppercase"
			onClick={() => handleChange(!value)}
		>
			<span
				className={`${
					value
						? "border-primary bg-primary justify-end"
						: "bg-content/10"
				} border rounded-full overflow-hidden relative flex items-center`}
				style={{
					width: "42px",
					padding: "1px",
					paddingBottom: "1px",
				}}
			>
				<span
					className="block rounded-full bg-white border"
					style={{
						width: "18px",
						height: "18px",
					}}
				></span>
			</span>

			{label && <span className="ml-2 text-sm">{label}</span>}
		</label>
	);
};

export default Switch;
