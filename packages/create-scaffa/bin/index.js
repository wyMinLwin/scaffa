#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { downloadTemplate } from 'giget'
import { spawn } from 'child_process';
import { createSpinner } from 'nanospinner';
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
	const spinner = createSpinner('Copying template files...').start();
	const templatePath = path.join(process.cwd(), 'templates', template);
	const destinationPath = path.join(process.cwd(), name);
	const sourcePath = templateType ? path.join(templatePath, templateType) : templatePath;
	try {
		await fs.promises.cp(sourcePath, destinationPath, { recursive: true });
		spinner.success({ text: chalk.green('Template files copied!') });
	} catch (err) {
		spinner.error({ text: chalk.red('Failed to copy template files') });
		throw err;
	}
};

// Get template
const getTemplate = async (name, template, templateType) => {
	const spinner = createSpinner('Downloading template...').start();
	try {
		const basePath = `gh:wyminlwin/scaffa/packages/create-scaffa/templates/${template}`;
		const source = templateType ? path.join(basePath, templateType) : basePath;
		await downloadTemplate(source, { dir: name });
		spinner.success({ text: chalk.green('Template downloaded successfully!') });
	} catch (err) {
		spinner.error({ text: chalk.red('Failed to download template') });
		throw err;
	}
}

const changePackageJSON = async (projectRootPath, projectName) => {
	const spinner = createSpinner('Configuring project...').start();
	const packageJsonPath = path.join(projectRootPath, 'package.json');
	try {
		const packageJsonContent = await fs.promises.readFile(packageJsonPath, 'utf8');
		const packageJson = JSON.parse(packageJsonContent);
		packageJson.name = projectName;
		await fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
		spinner.success({ text: chalk.green('Project configured!') });
	} catch (err) {
		spinner.error({ text: chalk.red('Failed to configure project') });
		throw err;
	}
};

const installDependencies = (packageManager) => {
	const spinner = createSpinner('Installing dependencies...').start();
	return new Promise((resolve, reject) => {
		const installProcess = spawn(generateCommand(packageManager), {
			stdio: 'pipe',
			shell: true
		});
		installProcess.on('close', (code) => {
			if (code === 0) {
				spinner.success({ text: chalk.green('Dependencies installed!') });
				resolve();
			} else {
				spinner.error({ text: chalk.red('Failed to install dependencies') });
				reject(new Error('Installation failed'));
			}
		});
		installProcess.on('error', (err) => {
			spinner.error({ text: chalk.red('Failed to install dependencies') });
			reject(err);
		});
	});
};

const main = async (projectName, template, packageManager, templateType) => {
	console.log(); // Add spacing after prompts
	try {
		if (process.env.npm_lifecycle_event === 'dev') {
			await copyTemplate(projectName, template, templateType);
		} else {
			await getTemplate(projectName, template, templateType);
		}
		const generatedProjectPath = path.join(process.cwd(), projectName);
		process.chdir(generatedProjectPath);
		await changePackageJSON(generatedProjectPath, projectName);
		await installDependencies(packageManager);
		console.log();
		console.log(chalk.greenBright.bold(('Happy Coding!')));
	} catch (err) {
		console.log();
		console.log(chalk.redBright('Something went wrong!'));
		process.exit(1);
	}
};
