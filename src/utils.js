export const randomId = () => Math.random().toString(36).slice(2);

export const themes = {
	orange: {
		name: "orange",
		backgroundColor: "#F2F7DE",
		borderColor: "linear-gradient(120deg, #131a6d 0%, #046d55 100%)",
		primaryColor: "#FF5722",
		imageOpacity: "50%",
		flower: "regular",
	},
	pink: {
		name: "pink",
		backgroundColor: "#fff7fa",
		borderColor: "linear-gradient(120deg, #300536 0%, #6d0469 100%)",
		primaryColor: "#E91E63",
		imageOpacity: "50%",
		flower: "regular",
	},
	green: {
		name: "green",
		backgroundColor: "#f9fff9",
		borderColor: "linear-gradient(120deg, #A1A62A 0%, #8BC34A 100%)",
		primaryColor: "#8bc34a",
		imageOpacity: "50%",
		flower: "green",
	},
	burgundy: {
		name: "burgundy",
		backgroundColor: "#FFFFFF",
		borderColor:
			"linear-gradient(120deg, rgba(60,40,63,1) 0%, rgba(168,97,26,1) 100%)",
		primaryColor: "#510216",
		imageOpacity: "50%",
		flower: "regular",
	},
};

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
