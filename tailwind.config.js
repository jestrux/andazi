/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				canvas: "rgb(var(--canvas-color) / <alpha-value>)",
				card: "rgb(var(--card-color) / <alpha-value>)",
				popup: "rgb(var(--popup-color) / <alpha-value>)",
				divider: "rgb(var(--divider-color) / <alpha-value>)",
				content: "rgb(var(--content-color) / <alpha-value>)",
				primary: "rgb(var(--primary-color) / <alpha-value>)",
				"primary-light":
					"rgb(var(--primary-light-color) / <alpha-value>)",
			},
		},
	},
	plugins: [],
};
