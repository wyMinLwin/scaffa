#!/usr/bin/env node

import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import templates from '../templates.js';

import { PACKAGE_MANAGERS, createGradientText } from './lib/config.js';
import { parseCommandLineArguments } from './lib/cli.js';
import { buildProjectQuestions, buildTemplateOptionsQuestion } from './lib/prompts.js';
import { copyLocalTemplate, downloadRemoteTemplate } from './lib/template.js';
import { updatePackageJson, installProjectDependencies } from './lib/project.js';

const setupProject = async (projectName, templateName, packageManager, templateVariant) => {
	console.log();
	try {
		if (process.env.npm_lifecycle_event === 'dev') {
			await copyLocalTemplate(projectName, templateName, templateVariant);
		} else {
			await downloadRemoteTemplate(projectName, templateName, templateVariant);
		}
		const generatedProjectPath = path.join(process.cwd(), projectName);
		process.chdir(generatedProjectPath);
		await updatePackageJson(generatedProjectPath, projectName);
		await installProjectDependencies(packageManager);
		console.log();
		console.log(chalk.greenBright.bold('Happy Coding!'));
	} catch (err) {
		console.log();
		console.log(chalk.redBright('Something went wrong!'));
		process.exit(1);
	}
};

const main = async () => {
	const gradientText = createGradientText();
	const initialText = 'create-scaffa executed!';

	console.log(chalk.bold(gradientText(initialText)));
	console.log(chalk(gradientText('-'.repeat(initialText.length))));

	const parsedArgs = parseCommandLineArguments(templates, PACKAGE_MANAGERS);

	try {
		const basicAnswers = await inquirer.prompt(
			buildProjectQuestions(parsedArgs, templates, PACKAGE_MANAGERS)
		);

		const selectedTemplate = parsedArgs.template ?? basicAnswers.chooseTemplate;
		const options = templates.find((template) => template.value === selectedTemplate)?.options;

		let templateVariant = null;
		if (options) {
			const optionAnswers = await inquirer.prompt(buildTemplateOptionsQuestion(options));
			templateVariant = optionAnswers.chooseTemplateType;
		}

		await setupProject(
			parsedArgs.name ?? basicAnswers.projectName,
			selectedTemplate,
			parsedArgs.packageManager ?? basicAnswers.choosePackageManager,
			templateVariant
		);
	} catch {
		console.log(chalk.hex('#eb392d')('Goodbye!'));
	}
};

main();
