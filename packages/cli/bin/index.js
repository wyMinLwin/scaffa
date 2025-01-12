#!/usr/bin/env node

// import template
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { simpleGit } from 'simple-git';
import { spawn } from 'child_process';
import templates from '../../templates/index.js';

const gradientText = gradient(['#f7cb45', '#f08b33', '#f25d27']);

const initialText = 'create@makro executed!';
console.log(chalk.bold(gradientText(initialText)));
console.log(chalk(gradientText('-'.repeat(initialText.length))));

inquirer
	.prompt([
		{
			message: 'Enter your project name?',
			name: 'projectName',
			validate: (input) => {
				if (/^(?![-_])[A-Za-z0-9-_]+(?<![-_])$/.test(input)) {
					return true;
				}
				return 'Please enter a valid project name';
			},
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
		console.log(answers);
		// cloneRepo(answers.projectName, answers.chooseTemplate, answers.choosePackageManager);
	})
	.catch(() => {
		console.log(chalk.hex('#eb392d')('Goodbye!'));
	});

const cloneSpinner = createSpinner('Cloning Repository...');
const initializingSpinner = createSpinner('Initializing Repository...');

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

const cloneRepo = async (projectName, template, packageManager) => {
	cloneSpinner.start();
	await simpleGit().clone('git@github.com:wyMinLwin/frontend-makro.git', projectName);
	cloneSpinner.stop();

	process.chdir(projectName);

	const templatePath = path.join(process.cwd(), 'packages', 'templates', template);
	const projectRootPath = process.cwd();

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

	// Copy template files
	const tempDir = path.join(projectRootPath, 'temp');
	await fs.promises.mkdir(tempDir, { recursive: true });
	await copyFiles(templatePath, tempDir);

	// Remove all files in the root of the cloned project
	const rootEntries = await fs.promises.readdir(projectRootPath, { withFileTypes: true });
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
			console.log(
				chalk.whiteBright(
					`run "cd ${projectName} && ${generateCommand(packageManager)}" to try again!`
				)
			);
		}
	});
};
