# Frontend Makro Documentation

## Overview

**Frontend Makro** is an all-in-one collection of pre-setup frontend templates and tools designed to help you quickly start modern frontend projects.

## Usage

To create a project run the command:

```sh
npx create-makro@latest
```

Then follow the interactive prompts. For more details on its implementation, check [packages/README.md](packages/README.md).

## Templates

| Template  | Tech Stack                                  |
| --------- | ------------------------------------------- |
| **React** | TypeScript, ShadcnUI, Axios, TanStack Query |
| **Vue**   | TypeScript, ShadcnUI, Axios, TanStack Query |

Each template includes
**routing**,
**localization**,
**data fetching** and all others necessary things with best practices.

## Project Structure

Below is an abbreviated folder structure:

```
...
packages/
  ├── cli/
  └── templates/
        ├── react-std/
        └── vue-std/
src/
static/
...
```

For a complete view, please refer to the project root.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the documentation, add features, or fix bugs.

**It's really important to follow instructions of**
[Contribution Guide](packages/README.md).

## License

This project is licensed under the [MIT License](LICENSE).
