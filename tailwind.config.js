/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#222222',
				primary: '#fce566',
				border: '#282828',
				mute: '#b2afab',
				light: '#f7f1ff',
				dark: '#211f22',
				error: '#fc608c',
			},
			fontFamily: {
				display: ['"Rubik"', 'sans-serif'],
			}
		}
	},
	plugins: []
};
