const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
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
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
