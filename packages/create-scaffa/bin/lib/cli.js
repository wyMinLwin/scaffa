import chalk from 'chalk';
import { PROJECT_NAME_REGEX } from './config.js';

const getArgumentValue = (flags) => {
	const index = process.argv.findIndex((arg) => flags.includes(arg));
	return index !== -1 ? process.argv[index + 1] : null;
};

export const parseCommandLineArguments = (templates, packageManagers) => {
	const parsedArguments = {
		name: null,
		template: null,
		packageManager: null
	};

	if (process.argv.length >= 4) {
		const templateFromArgv = getArgumentValue(['-template', '-t']);
		if (templateFromArgv && templates.some((template) => template.value === templateFromArgv)) {
			parsedArguments.template = templateFromArgv;
		} else if (templateFromArgv) {
			console.warn(chalk.hex('#ea7000')('Invalid template.'));
		}

		const packageManagerFromArgv = getArgumentValue(['-package', '-p']);
		if (
			packageManagerFromArgv &&
			packageManagers.some((p) => p.value === packageManagerFromArgv)
		) {
			parsedArguments.packageManager = packageManagerFromArgv;
		} else if (packageManagerFromArgv) {
			console.warn(chalk.hex('#ea7000')('Invalid package manager.'));
		}
	}

	if (process.argv.length >= 3) {
		const projectNameFromArgv = process.argv[2];
		if (projectNameFromArgv && PROJECT_NAME_REGEX.test(projectNameFromArgv)) {
			parsedArguments.name = projectNameFromArgv;
		} else if (process.argv.length < 4) {
			console.warn(chalk.hex('#ea7000')('Invalid project name.'));
		}
	}

	return parsedArguments;
};
