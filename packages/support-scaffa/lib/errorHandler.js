// Error list
const CUSTOM_MESSAGES = {
	'required.library': 'Field "library" is required (allowed: vue | react).',
	'required.version': 'Field "version" is required (use semver, e.g. 1.2.3).',
	'enum.library': 'Library must be either "vue" or "react".',
	'pattern.version': 'Version must follow semver (e.g., 1.2.3 or 1.2.3-beta).'
};

export function formatAjvError(err) {
	// Determine the field name from instancePath or missingProperty
	const fromPath = err.instancePath ? err.instancePath.replace(/^\//, '') : '';
	const field = fromPath || (err.params && err.params.missingProperty) || 'root';
	const key = `${err.keyword}.${field}`;

	// Use custom message if provided
	if (CUSTOM_MESSAGES[key]) return CUSTOM_MESSAGES[key];

	// Sensible defaults per keyword
	switch (err.keyword) {
		case 'required':
			return `${err.params.missingProperty} is required`;
		case 'enum':
			return `${field} must be one of: ${err.params.allowedValues.join(', ')}`;
		case 'type':
			return `${field} must be of type ${err.params.type}`;
		case 'pattern':
			return `${field} ${err.message}`; // message usually describes the pattern
		default:
			return `${field || 'value'} ${err.message}`;
	}
}
