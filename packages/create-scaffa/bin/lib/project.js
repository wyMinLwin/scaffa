import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { spawn } from 'child_process';
import { createSpinner } from 'nanospinner';

const getInstallCommand = (packageManager) => {
	switch (packageManager) {
		case 'npm':
			return 'npm install --legacy-peer-deps';
		case 'pnpm':
			return 'pnpm install';
		default:
			return 'npm install --legacy-peer-deps';
	}
};

export const updatePackageJson = async (projectPath, projectName) => {
	const spinner = createSpinner('Configuring project...').start();
	const packageJsonPath = path.join(projectPath, 'package.json');
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

export const installProjectDependencies = (packageManager) => {
	const spinner = createSpinner('Installing dependencies...').start();
	return new Promise((resolve, reject) => {
		const installProcess = spawn(getInstallCommand(packageManager), {
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
