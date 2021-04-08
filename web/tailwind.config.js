const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
	darkMode: "media",
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			gray: colors.gray,
			red: colors.red,
			teal: colors.teal,
			white: colors.white,
			yellow: colors.yellow,
		},
		fontFamily: {
			sans: ["Karla", "sans-serif"],
		},
		maxHeight: {
			0: "0",
			"1/2": "50vh",
			"9/10": "90vh",
			full: "100%",
		},
	},
	variants: {
		extend: {
			backgroundColor: ["disabled", "checked"],
			borderColor: ["checked"],
			borderRadius: ["first", "last"],
			cursor: ["disabled"],
			margin: ["last"],
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
