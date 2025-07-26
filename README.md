# Scaffa Documentation

## Overview

**Scaffa** is an all-in-one collection of pre-setup frontend templates and tools designed to help you quickly start modern frontend projects.

## Usage

To create a project run the command:

```sh
npx create-scaffa@latest
```

Then follow the interactive prompts. For more details on its implementation, check [CLI Implementation](packages/create-scaffa/README.md).

## Scaffold

You can even create a project easily with scaffold feature.

```sh
npx create-scaffa@latest <ur-project-name> -t <template> -p <package-manager>
```

**Example**

```sh
npx create-scaffa@latest scaffa-starter -t vue -p pnpm
```

This single line of command will create a Vue template with the name scaffa-starter and handle dependencies with pnpm. You can see the availables table in **[Templates](#templates)**.

**Note that if we have option to select templates it will ask you one more question to choose option!**

## Templates

| Template             | Tech Stack                                  | Preview                                               |
| -------------------- | ------------------------------------------- | ----------------------------------------------------- |
| **react** (colorful) | TypeScript, ShadcnUI, Axios, TanStack Query | [🎨 Live Preview](https://colorful-scaffa.vercel.app) |
| **react** (backbone) | TypeScript, ShadcnUI, Axios, TanStack Query | [🚀 Live Preview](https://backbone-scaffa.vercel.app) |
| **vue**              | TypeScript, ShadcnUI, Axios, TanStack Query | [💚 Live Preview](https://vue-scaffa.vercel.app)      |

Each template includes
**routing**,
**localization**,
**data fetching** and all others necessary things with best practices.

## Project Structure

Below is an abbreviated folder structure:

<pre>
 ...
 packages/
 ├── create-scaffa/
 │   ├── bin/
 │   │   └── index.js
 │   └── templates/
 src/
 static/
 ...
</pre>

For a complete view, please refer to the project root.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the documentation, add features, or fix bugs.

**It's really important to follow instructions of**
[Contributing Guide](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
