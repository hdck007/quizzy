/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#ff3b3f',
					secondary: '#F000B8',
					accent: '#ae9bf1',
					neutral: '#f3f4fa',
					'base-100': '#FFFFFF',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
				},
			},
		],
	},
};
