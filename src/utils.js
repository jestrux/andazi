export const randomId = () => Math.random().toString(36).slice(2);

export const parseColor = (value) => {
	if (!value.length) return null;

	if (!Array.isArray(value)) return value;

	const gradient =
		Array.isArray(value) &&
		value
			.map((color, idx) => {
				return `${color} ${(idx * 100) / (value.length - 1)}%`;
			})
			.join(", ");

	return `linear-gradient(90deg, ${gradient})`;
};
