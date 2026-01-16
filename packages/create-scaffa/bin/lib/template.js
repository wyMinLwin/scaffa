import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { downloadTemplate } from 'giget';
import { createSpinner } from 'nanospinner';

export const copyLocalTemplate = async (projectName, templateName, templateVariant) => {
	const spinner = createSpinner('Copying template files...').start();
	const templatePath = path.join(process.cwd(), 'templates', templateName);
	const destinationPath = path.join(process.cwd(), projectName);
	const sourcePath = templateVariant ? path.join(templatePath, templateVariant) : templatePath;
	try {
		await fs.promises.cp(sourcePath, destinationPath, { recursive: true });
		spinner.success({ text: chalk.green('Template files copied!') });
	} catch (err) {
		spinner.error({ text: chalk.red('Failed to copy template files') });
		throw err;
	}
};

export const downloadRemoteTemplate = async (projectName, templateName, templateVariant) => {
	const spinner = createSpinner('Downloading template...').start();
	try {
		const basePath = `gh:wyminlwin/scaffa/packages/create-scaffa/templates/${templateName}`;
		const source = templateVariant ? path.join(basePath, templateVariant) : basePath;
		await downloadTemplate(source, { dir: projectName });
		spinner.success({ text: chalk.green('Template downloaded successfully!') });
	} catch (err) {
		spinner.error({ text: chalk.red('Failed to download template') });
		throw err;
	}
};
