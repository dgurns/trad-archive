const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx,md,mdx}"],
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
