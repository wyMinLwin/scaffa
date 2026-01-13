#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { downloadTemplate } from 'giget'
import { spawn } from 'child_process';
import templates from '../templates.js';

const availablePackageManagers = [
	{ name: 'NPM', value: 'npm' },
	{ name: 'PNPM', value: 'pnpm' }
];

const gradientText = gradient(['#f7cb45', '#f08b33', '#f25d27']);
const aliasSchema = {
	name: null,
	template: null,
	packageManager: null
};

// Helper to fetch argument values for given flags
const getArgValue = (flags) => {
	const index = process.argv.findIndex((arg) => flags.includes(arg));
	return index !== -1 ? process.argv[index + 1] : null;
};

// CLI validation
const validateCLI = () => {
	if (process.argv.length >= 4) {
		const templateFromArgv = getArgValue(['-template', '-t']);
		if (templateFromArgv && templates.some((template) => template.value === templateFromArgv)) {
			aliasSchema.template = templateFromArgv;
		} else if (templateFromArgv) {
			console.warn(chalk.hex('#ea7000')('Invalid template.'));
		}

		const packageManagerFromArgv = getArgValue(['-package', '-p']);
		if (
			packageManagerFromArgv &&
			availablePackageManagers.some((p) => p.value === packageManagerFromArgv)
		) {
			aliasSchema.packageManager = packageManagerFromArgv;
		} else if (packageManagerFromArgv) {
			console.warn(chalk.hex('#ea7000')('Invalid package manager.'));
		}
	}

	if (process.argv.length >= 3) {
		const projectNameFromArgv = process.argv[2];
		if (projectNameFromArgv && /^(?![-_])[A-Za-z0-9-_]+(?<![-_])$/.test(projectNameFromArgv)) {
			aliasSchema.name = projectNameFromArgv;
		} else if (process.argv.length < 4) {
			console.warn(chalk.hex('#ea7000')('Invalid project name.'));
		}
	}
};

const initialText = 'create-scaffa executed!';

console.log(chalk.bold(gradientText(initialText)));
console.log(chalk(gradientText('-'.repeat(initialText.length))));

validateCLI();

const basicQuestions = [
	{
		message: 'Enter your project name?',
		name: 'projectName',
		validate: (input) =>
			/^(?![-_])[A-Za-z0-9-_]+(?<![-_])$/.test(input) ? true : 'Please enter a valid project name',
		when: aliasSchema.name === null,
		default: 'Scaffa-starter'
	},
	{
		type: 'list',
		choices: templates,
		name: 'chooseTemplate',
		message: 'Choose Template',
		loop: true,
		when: aliasSchema.template === null,
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
		choices: availablePackageManagers,
		name: 'choosePackageManager',
		message: 'Choose Package Manager',
		when: aliasSchema.packageManager === null
	}
];

// Prompt user for project name and template
inquirer
	.prompt(basicQuestions)
	.then((basicAnswers) => {
		// check options exist for the selected template
		const options = templates.find(
			(template) => template.value === (aliasSchema.template ?? basicAnswers.chooseTemplate)
		)?.options;
		if (options) {
			inquirer
				.prompt([
					{
						type: 'list',
						choices: options,
						name: 'chooseTemplateType',
						message: 'Choose Template Type'
					}
				])
				.then((optionAnswers) => {
					main(
						aliasSchema.name ?? basicAnswers.projectName,
						aliasSchema.template ?? basicAnswers.chooseTemplate,
						aliasSchema.packageManager ?? basicAnswers.choosePackageManager,
						optionAnswers.chooseTemplateType
					);
				})
				.catch(() => {
					console.log(chalk.hex('#eb392d')('Goodbye!'));
				});
		} else {
			main(
				aliasSchema.name ?? basicAnswers.projectName,
				aliasSchema.template ?? basicAnswers.chooseTemplate,
				aliasSchema.packageManager ?? basicAnswers.choosePackageManager,
				null
			);
		}
	})
	.catch(() => {
		console.log(chalk.hex('#eb392d')('Goodbye!'));
	});

//generate command based on package manager
const generateCommand = (packageManager) => {
	switch (packageManager) {
		case 'npm':
			return 'npm install --legacy-peer-deps';
		case 'pnpm':
			return 'pnpm install';
		default:
			return 'npm install --legacy-peer-deps';
	}
};

// copy template
const copyTemplate = async (name, template, templateType) => {
	// Copy template files to the new project directory
	const templatePath = path.join(process.cwd(), 'templates', template);
	const destinationPath = path.join(process.cwd(), name);
	let sourcePath = templatePath;
	if (templateType) {
		sourcePath = path.join(templatePath, templateType);
	}
	try {
		await fs.promises.cp(sourcePath, destinationPath, { recursive: true });
	} catch (err) {
		console.log(chalk.red('Failed to copy template files:'), err);
	}
};

// Get template
const getTemplate = async (name, template, templateType) => {
	try {
		const basePath = `gh:wyminlwin/scaffa/packages/create-scaffa/templates/${template}`;
		if (templateType) {
			return path.join(basePath, templateType);
		}
		await downloadTemplate(basePath, {
			dir: name
		})
	} catch (err) {
		console.log(chalk.red('Failed to download template files:'), err);
	}
}

const changePackageJSON = async (projectRootPath, projectName) => {
	// Update package.json with the new project name
	const packageJsonPath = path.join(projectRootPath, 'package.json');
	try {
		const packageJsonContent = await fs.promises.readFile(packageJsonPath, 'utf8');
		const packageJson = JSON.parse(packageJsonContent);
		packageJson.name = projectName;
		await fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
	} catch (err) {
		console.log(chalk.red('Failed to update package.json:'), err);
	}
};

const installDependencies = async (packageManager) => {
	const installProcess = spawn(generateCommand(packageManager), {
		stdio: 'inherit',
		shell: true
	});
	installProcess.on('close', (code) => {
		if (code === 0) {
			console.log(chalk.blue('Dependencies installed successfully!'));
			console.log(chalk.greenBright('Happy Coding!'));

		} else {
			console.log(chalk.redBright('\n\nSomething went wrong!'));
		}
	});
};

const main = async (projectName, template, packageManager, templateType) => {
	if (process.env.npm_lifecycle_event === 'dev') {
		await copyTemplate(projectName, template, templateType);
	} else {
		await getTemplate(projectName, template, templateType)
	}
	const generatedProjectPath = path.join(process.cwd(), projectName);
	// change directory
	process.chdir(generatedProjectPath);
	await changePackageJSON(generatedProjectPath, projectName);
	await installDependencies(packageManager);
};
