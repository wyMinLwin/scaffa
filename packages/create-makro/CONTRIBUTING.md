# Create Your Own Templates

## Todo

1. Create new project as you want in **packages/create-makro/templates**.
2. Add new template object as show in below in **packages/create-makro/templates.js**.

**To add a template you have two options**
1. Non-Option Template (can have only 1 variant)
2. Option Template (can have more than 1 variant)

### Non-Option Templates

Example structure for Non-Option Templates

```bash
...
packages/
├── create-makro/
│   ├── bin/
│   │   └── index.js
│   └── templates/
│       └── your-project/
...
```

```bash
//templates.js
export default [
    ...,
	{
        name: YOUR_TEMPLATE_DISPLAY_NAME,
        value: YOUR_TEMPLATE_FOLDER_NAME,
        color: YOUR_TEMPLATE_ACTIVE_COLOR,
    },
];
```

### Option Templates

Example structure for Option Templates

```bash
...
packages/
├── create-makro/
│   ├── bin/
│   │   └── index.js
│   └── templates/
│       └── your-root-folder/
│           ├── your-project-folder-1/
│           └── your-project-folder-2/
...
```

```bash
//templates.js
export default [
    ...,
	{
        name: YOUR_TEMPLATE_DISPLAY_NAME,
        value: YOUR_TEMPLATE_ROOT_FOLDER_NAME,
        color: YOUR_TEMPLATE_ACTIVE_COLOR,
        options: [
			{
				name: YOUR_TEMPLATE_OPTION_NAME,
				value: YOUR_TEMPLATE_FOLDER_NAME
			},
		]
    },
];
```

**Awesome! That's all.**

## Rules

**Maintainers will reject PR If you break one of the rules**

- **You are not allowed to change index of your templates except you are a maintainer.**
- **You are not allowed to change the existing templates names and paths.**
- **You must follow the path for options and non-options path structure for code correctness.**
