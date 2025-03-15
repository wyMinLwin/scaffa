#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { simpleGit } from 'simple-git';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

// Create __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//get all the templates
const templates = fs
	.readdirSync(path.resolve(__dirname, '../templates'), { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => ({
		name: entry.name, // Customize the display name if needed
		value: entry.name
	}));


const gradientText = gradient(['#f7cb45', '#f08b33', '#f25d27']);
const initialText = 'create@makro executed!';
console.log(chalk.bold(gradientText(initialText)));
console.log(chalk(gradientText('-'.repeat(initialText.length))));

// Prompt user for project name and template
inquirer
	.prompt([
		{
			message: 'Enter your project name?',
			name: 'projectName',
			validate: (input) =>
				/^(?![-_])[A-Za-z0-9-_]+(?<![-_])$/.test(input)
					? true
					: 'Please enter a valid project name',
			default: 'frontend-makro-starter'
		},
		{
			type: 'list',
			choices: templates,
			name: 'chooseTemplate',
			message: 'Choose Template'
		},
		{
			type: 'list',
			choices: ['NPM', 'PNPM'],
			name: 'choosePackageManager',
			message: 'Choose Package Manager'
		}
	])
	.then((answers) => {
		cloneRepo(answers.projectName, answers.chooseTemplate, answers.choosePackageManager);
	})
	.catch(() => {
		console.log(chalk.hex('#eb392d')('Goodbye!'));
	});

const cloneSpinner = createSpinner('Cloning Repository...');
const initializingSpinner = createSpinner('Initializing Repository...');

//generate command based on package manager
const generateCommand = (packageManager) => {
	switch (packageManager) {
		case 'NPM':
			return 'npm install --legacy-peer-deps';
		case 'PNPM':
			return 'pnpm install';
		default:
			return 'npm install --legacy-peer-deps';
	}
};

// Clone the repository and copy the template files
const cloneRepo = async (projectName, template, packageManager) => {
	cloneSpinner.start();
	await simpleGit().clone('https://github.com/wyMinLwin/frontend-makro.git', projectName);
	cloneSpinner.stop();

	// Change directory to the cloned project
	process.chdir(projectName);

	// Path to the template files
	const templatePath = path.join(process.cwd(), 'packages', 'templates', template);
	const projectRootPath = process.cwd();

	// Copy files recursively
	const copyFiles = async (src, dest) => {
		const entries = await fs.promises.readdir(src, { withFileTypes: true });
		for (let entry of entries) {
			const srcPath = path.join(src, entry.name);
			const destPath = path.join(dest, entry.name);
			if (entry.isDirectory()) {
				await fs.promises.mkdir(destPath, { recursive: true });
				await copyFiles(srcPath, destPath);
			} else {
				await fs.promises.copyFile(srcPath, destPath);
			}
		}
	};

	initializingSpinner.start();

	// Copy template files to a temporary location
	const tempDir = path.join(projectRootPath, 'temp');
	await fs.promises.mkdir(tempDir, { recursive: true });
	await copyFiles(templatePath, tempDir);

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

	// Paste the copied files into the root of the cloned project
	await copyFiles(tempDir, projectRootPath);
	await fs.promises.rm(tempDir, { recursive: true, force: true });

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

	initializingSpinner.stop();

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
