import gradient from 'gradient-string';

export const PACKAGE_MANAGERS = [
	{ name: 'NPM', value: 'npm' },
	{ name: 'PNPM', value: 'pnpm' },
	{ name: 'Bun', value: 'bun' }
];

export const PROJECT_NAME_REGEX = /^(?![-_])[A-Za-z0-9-_]+(?<![-_])$/;

export const createGradientText = () => gradient(['#f7cb45', '#f08b33', '#f25d27']);
