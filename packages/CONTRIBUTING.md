# Create Your Own Templates

## Todo

1. Create new project as you want in **packages/templates**.
2. Add new template object as show in below in **package/cli/templates.js**
```
export default [
    ...,
	{ 
        name: YOUR_TEMPLATE_DISPLAY_NAME, 
        value: YOUR_TEMPLATE_NAME, 
        color: YOUT_TEMPLATE_ACTIVE_COLOR
    },
];
```
**Awesome! That's all.**

## Rules

**Maintainers will reject PR If you break one of the rules**
- **You are not allowed to change index of your templates except you are a maintainer.**
- **You are not allowed to change the existing templates names and paths**
