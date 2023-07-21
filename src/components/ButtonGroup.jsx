export default function ButtonGroup({ choices = [], onChange, value: _value }) {
	return (
		<div
			className="inline-flex border rounded overflow-hidden"
			style={{ padding: "0.1rem" }}
		>
			{choices.map((choice, index) => {
				const isObject = typeof choice == "object";
				const label = isObject ? choice.label : choice;
				const value = isObject ? choice.value : choice;
				const selected = _value == value;

				return (
					<button
						key={index}
						className={`text-sm/none font-medium p-2.5 capitalize cursor-pointer ${
							index < choices.length - 1
								? "border-r"
								: "border-transparent"
						} ${
							selected
								? "border-transparent bg-content/10 stext-card rounded-sm"
								: "opacity-60"
						}`}
						onClick={() => onChange(value)}
					>
						{label.toString()}
					</button>
				);
			})}
		</div>
	);
}
