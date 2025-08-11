import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import { formatAjvError } from './errorHandler.js';

const checkSchema = async (schema, content) => {
	// allErrors to report all issues instead of stopping at the first one
	const ajv = new Ajv({ allErrors: true, strict: false });

	const validateSchema = ajv.compile(schema);
	const valid = validateSchema(content);
	if (!valid) {
		const messages = (validateSchema.errors || []).map(formatAjvError);
		throw new Error(messages.join('\n'));
	}
};

const checkVersion = async (content) => {
	const version = content.version;
	if (version.split('.').join('') < '313') {
		throw new Error('Scaffa JSON version less than 3.1.3 is not supported!');
	}
};

export async function validate() {
	try {
		// Schema JSON
		const schemaResult = await fetch('https://scaffa.vercel.app/schema.json');
		const schemaJSON = await schemaResult.json();

		// Scaffa JSON
		const projectRootPath = process.cwd();
		const scaffaJSONPath = path.join(projectRootPath, 'scaffa.json');
		const scaffaJSONString = await fs.promises.readFile(scaffaJSONPath, 'utf8');
		const scaffaJSONContent = await JSON.parse(scaffaJSONString);

		await checkSchema(schemaJSON, scaffaJSONContent);
		await checkVersion(scaffaJSONContent);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}
