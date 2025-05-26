#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { simpleGit } from 'simple-git';
import { spawn } from 'child_process';
import 'dotenv/config';
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

const initialText = 'create-makro executed!';

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
		default: 'frontend-makro-starter'
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
					generateTemplate(
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
			generateTemplate(
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

const cloneSpinner = createSpinner('Cloning Repository...');
const initializingSpinner = createSpinner('Initializing Repository...');

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

const copyIgnoreList = ['node_modules', '.vercel', '.svelte-kit', '.build'];
// Copy files recursively
const copyFiles = async (src, dest, destRoot) => {
	const entries = await fs.promises.readdir(src, { withFileTypes: true });
	for (let entry of entries) {
		const srcPath = path.join(src, entry.name);
		// Skip copying if srcPath is the destination folder
		if (destRoot && path.resolve(srcPath) === path.resolve(destRoot)) {
			continue;
		}
		const destPath = path.join(dest, entry.name);
		if (copyIgnoreList.includes(entry.name)) {
			continue;
		}
		if (entry.isDirectory()) {
			await fs.promises.mkdir(destPath, { recursive: true });
			await copyFiles(srcPath, destPath, destRoot);
		} else {
			await fs.promises.copyFile(srcPath, destPath);
		}
	}
};

// Clone the repository and copy the template files
const cloneRepo = async (projectName) => {
	cloneSpinner.start();
	if (process.env.npm_lifecycle_event === 'dev') {
		await copyLocalRepo(projectName);
	} else {
		await simpleGit().clone('https://github.com/wyMinLwin/frontend-makro.git', projectName);
	}
	cloneSpinner.stop();
};

const copyLocalRepo = async (projectName) => {
	const localRepoPath = path.join(process.cwd(), '../../');
	await fs.promises.mkdir(projectName, { recursive: false });
	await copyFiles(localRepoPath, projectName, projectName);
};

// Copy Temporary Selected Template into
const copyTemporarilySelectedTemplate = async (template, projectRootPath, templateType) => {
	// Path to the template files
	const templatePath = templateType
		? path.join(process.cwd(), 'packages/create-makro/templates', template, templateType)
		: path.join(process.cwd(), 'packages/create-makro/templates', template);
	initializingSpinner.start();
	// Copy template files to a temporary location
	const tempDir = path.join(projectRootPath, 'temp');
	await fs.promises.mkdir(tempDir, { recursive: true });
	await copyFiles(templatePath, tempDir, tempDir);
	return tempDir;
};

const cleanUp = async (projectRootPath) => {
	// Remove all files in the root of the cloned project (except temp)
	const rootEntries = await fs.promises.readdir(projectRootPath, {
		withFileTypes: true
	});
	for (let entry of rootEntries) {
		const entryPath = path.join(projectRootPath, entry.name);
		if (entry.isDirectory() && entry.name !== 'temp') {
			await fs.promises.rm(entryPath, { recursive: true, force: true });
		} else if (entry.name !== 'temp') {
			await fs.promises.unlink(entryPath);
		}
	}
};

const moveTempFilesIntoRoot = async (tempDir, projectRootPath) => {
	// Paste the copied files into the root of the cloned project
	await copyFiles(tempDir, projectRootPath, projectRootPath);
	await fs.promises.rm(tempDir, { recursive: true, force: true });
};

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
	console.log(chalk.blue('~ Installing Dependencies... ~'));
	const installProcess = spawn(generateCommand(packageManager), {
		stdio: 'inherit',
		shell: true
	});
	installProcess.on('close', (code) => {
		if (code === 0) {
			console.log(chalk.greenBright('Project created successfully!'));
			console.log(chalk.greenBright('Happy Coding!'));
		} else {
			console.log(chalk.redBright('\n\nSomething went wrong!'));
		}
	});
};

const generateTemplate = async (projectName, template, packageManager, templateType) => {
	await cloneRepo(projectName);
	// Change directory to the cloned project
	process.chdir(projectName);
	const projectRootPath = process.cwd();

	const tempDir = await copyTemporarilySelectedTemplate(template, projectRootPath, templateType);
	await cleanUp(projectRootPath);
	await moveTempFilesIntoRoot(tempDir, projectRootPath);
	await changePackageJSON(projectRootPath, projectName);
	initializingSpinner.stop();
	await installDependencies(packageManager);
};
