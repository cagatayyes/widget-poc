/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./src/**/*.{html, js, ts, tsx, jsx}',
		'./src/**/*',
	],
	theme: {
		extend: {
			spacing: {
				5.5: '22px',
				3.75: '15px',
			},
			borderRadius: {
				sm: '3px',
			},
			dropShadow: {
				'sash': [
					'0 0 6px rgba(0, 0, 0, 0.25)',
					'0 1px 1px rgba(0, 0, 0, 0.40)',
				],
			},
			fontFamily: {
				'roboto-normal': ['Roboto']
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
