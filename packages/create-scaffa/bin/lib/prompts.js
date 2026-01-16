import chalk from 'chalk';
import { PROJECT_NAME_REGEX } from './config.js';

export const buildProjectQuestions = (parsedArgs, templates, packageManagers) => {
	return [
		{
			message: 'Enter your project name?',
			name: 'projectName',
			validate: (input) =>
				PROJECT_NAME_REGEX.test(input) ? true : 'Please enter a valid project name',
			when: parsedArgs.name === null,
			default: 'Scaffa-starter'
		},
		{
			type: 'list',
			choices: templates,
			name: 'chooseTemplate',
			message: 'Choose Template',
			loop: true,
			when: parsedArgs.template === null,
			theme: {
				style: {
					highlight: (str) => {
						try {
							const color = templates.find((template) => template.name === str.slice(2)).color;
							return chalk.hex(color)(str);
						} catch {
							return chalk.hex('#fce566')(str);
						}
					}
				},
				icon: { cursor: '➤' }
			}
		},
		{
			type: 'list',
			choices: packageManagers,
			name: 'choosePackageManager',
			message: 'Choose Package Manager',
			when: parsedArgs.packageManager === null
		}
	];
};

export const buildTemplateOptionsQuestion = (options) => {
	return [
		{
			type: 'list',
			choices: options,
			name: 'chooseTemplateType',
			message: 'Choose Template Type'
		}
	];
};
