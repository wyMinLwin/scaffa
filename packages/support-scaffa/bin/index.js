#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

console.log('Hello from support-scaffa!');
console.log(process.env.npm_lifecycle_event);

const checkSchema = async () => {
	const shemaResult = await fetch('https://scaffa.vercel.app/schema.json');
	const schemaJSON = await shemaResult.json();

	const ajv = new Ajv();
	const validate = ajv.compile(schemaJSON);

	const projectRootPath = process.cwd();
	const scaffaJSONPath = path.join(projectRootPath, 'scaffa.json');
	const scaffaJSONString = await fs.promises.readFile(scaffaJSONPath, 'utf8');
	const scaffaJSONContent = await JSON.parse(scaffaJSONString);
	const valid = validate(scaffaJSONContent);

	if (valid) {
		console.log('✅ Data is valid!');
	} else {
		console.error('❌ Validation errors:');
		console.error(validate.errors);
	}
};
await checkSchema();
