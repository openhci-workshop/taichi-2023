/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'dark-black': '#0A2342',
				'dark-gray': '#5F5F5F',
				'light-green': '#cae02c',
				'dark-yellow': '#EED045',
			},
			listStyleType: {
				roman: 'lower-roman',
			},
		},
	},
	plugins: [],
};
