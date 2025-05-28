# Single UI Remote App Boilerplate

A robust boilerplate for building Single UI Remote Applications using modern web development tools and best practices. This project facilitates the creation of scalable and maintainable front-end applications within the Single UI ecosystem.

## Overview

This boilerplate serves as the foundation for developing sophisticated remote applications. It integrates key tools and technologies to provide better performance, structured development, and an optimal developer experience.

### Features

- 🚀 **Vue 3**: Built with Composition API for flexible and powerful application development.
- 📘 **TypeScript Support**: Ensures type safety and better developer experience.
- 🎨 **TailwindCSS**: Custom-tailored styling with preconfigured themes and presets for cohesive design.
- 📦 **Vite**: A modern build tool offering fast development and optimized builds.
- 🏪 **Pinia**: An intuitive state management library for managing application data.
- 🔄 **Vue Router**: Ready-to-use implementation for handling navigation.
- 🎭 **Vue3 Lottie**: Built-in support for Lottie animations.
- 🧪 **Vitest**: Simple and blazing-fast unit testing.
- 📝 **ESLint and Prettier**: Preconfigured for consistent code formatting and linting.
- 🪝 **Husky**: Git hooks for better pre-commit checks and workflows.

## Prerequisites

Before starting with this project, ensure you have the following installed:

- **Node.js**: Version 20 or higher
- **pnpm**: Package manager for dependency management
- **Git**: Version control for managing source code

## Technologies Used

- **TypeScript**: v5.8.3
- **Vue.js**: v3.5.14
- **Pinia**: v3.0.2
- **TailwindCSS**: v4.1.7
- **Vite**: v6.3.5

## Getting Started

Follow the steps to get started with the project:

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd singleui-remoteapp-boilerplate
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Run the development server:
    ```bash
    pnpm dev
    ```

### Build

For different environments, use the respective commands:

- **Development Build**:
    ```bash
    pnpm build:development
    ```
- **Staging Build**:
    ```bash
    pnpm build:staging
    ```
- **Production Build**:
    ```bash
    pnpm build:production
    ```

### Preview

Serve the build locally for preview:

- ```bash
  pnpm preview
  ```

## Project Structure

```text
singleui-remoteapp-boilerplate
├── public/ # Public assets (e.g., images, static files)
│ └── vite.svg # Vite icon example
├── src/ # Main source code
│ ├── components/ # Vue components
│ │ └── [ComponentName].vue # Reusable UI components (buttons, modals, etc.)
│ ├── layout/ # Layout components
│ │ └── [LayoutName].vue # Layouts for structuring pages (e.g., NavbarLayout)
│ ├── lib/ # Utility libraries
│ │ └── [UtilityModules] # Reusable JavaScript/TypeScript helper modules
│ ├── stores/ # Pinia state management
│ │ └── [StoreName].ts # Centralized management of application state
│ ├── styles/ # TailwindCSS and global styling
│ │ └── tailwind.scss # Tailwind directives and custom layer definitions
│ ├── views/ # Page views
│ │ └── [PageName].vue # Full pages containing their own logic and structure
│ ├── App.vue # Root Vue component
│ ├── main.ts # Entry point for mounting the Vue app
│ └── vite-env.d.ts # TypeScript environment declaration
├── index.html # HTML entry file
├── vite.config.ts # Vite configuration
├── tailwind.config.js # TailwindCSS configuration
├── postcss.config.cjs # PostCSS plugins configuration
├── package.json # Project metadata, scripts, and dependencies
├── README.md # Project documentation
├── tsconfig.json # TypeScript general configuration
├── tsconfig.app.json # TypeScript configuration for the application
├── tsconfig.node.json # TypeScript configuration for Node.js modules
├── tsconfig.vitest.json # TypeScript configuration for unit testing with Vitest
├── .eslintrc.js # ESLint configuration for linting JavaScript and TypeScript files
├── .prettierrc # Prettier configuration for code formatting
├── .gitignore # Git ignore rules configuration
├── .gitlab-ci.yml # Gitlab CI/CD pipeline configuration
└── pnpm-lock.yaml # Lock file for dependency resolution and versioning
```

## Customization

### TailwindCSS Theme

The project's theme is extended in the `tailwind.config.js` file. Custom variables are defined for easy theming and styling.

### ESLint & Prettier

Linting and formatting rules are predefined. Run the following command to lint and fix files:

- ```bash
  pnpm lint
  ```

## Testing

Write and run your unit tests using Vitest:

- ```bash
  pnpm test
  ```

## Deployment

Ensure you build the project for the desired environment before deployment:

- ```bash
  pnpm build:production
  ```

## Contributions

Feel free to contribute to this boilerplate. Fork the repository and make the necessary changes. Then, open a pull request to review the updates.

## License

This project is licensed under the **[PT Pegadaian](https://pegadaian.co.id)**.
