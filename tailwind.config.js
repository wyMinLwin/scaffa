/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#f8f5f3',
				primary: '#f7cb45',
				border: '#282828',
				mute: '#b2afab'
			},
			fontFamily: {
				title: ['"Karla"', 'sans-serif'],
				display: ['"Inconsolata"', 'monospace']
			}
		}
	},
	plugins: []
};
