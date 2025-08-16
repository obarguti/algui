# AlgUI

A modern React application built with TypeScript, Vite, and SASS (SCSS).

## Tech Stack

- **Framework**: React 19+ with TypeScript
- **Build Tool**: Vite
- **Styling**: SASS/SCSS
- **Package Manager**: npm

## Features

- Fast development with Vite HMR
- SASS/SCSS styling with variables and mixins
- TypeScript for type safety
- ESLint for code quality
- Optimized production builds

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build the application for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
├── assets/             # Static assets
├── App.tsx             # Main App component
├── App.scss            # App styles
├── main.tsx            # Entry point
└── index.scss          # Global styles
```

## Styling

This project uses SASS/SCSS for styling. The styles are organized with:
- Variables for consistent theming
- Mixins for reusable styles
- Nested selectors for better organization
- Light/dark theme support

## Contributing

1. Follow the existing code style
2. Use TypeScript for all components
3. Use SCSS for styling
4. Write meaningful commit messages

## Project Components

### Configuration Files

#### vite.config.ts
Configures Vite build tool and development server. Currently registers the React plugin which handles JSX/TSX transformation, React Fast Refresh for hot reloading, and React-specific optimizations. This is a minimal setup that could be extended with additional plugins, dev server options, build configurations, and path aliases as needed.

#### TypeScript Configuration
- **`tsconfig.json`**: Root composite configuration that references the other TypeScript configs
- **`tsconfig.app.json`**: Configuration for React app code (`src/` folder) - includes DOM types, JSX support, and browser-specific settings
- **`tsconfig.node.json`**: Configuration for Node.js tooling files like `vite.config.ts` - includes Node.js types and server-side environment settings

The separate configs are needed because build tools run in Node.js while the app runs in browsers, requiring different TypeScript settings and library types.

#### package.json
Defines project metadata, dependencies, and npm scripts. Key elements include:
- **Scripts**: `dev` (start dev server), `build` (compile TypeScript and build), `lint` (run ESLint), `preview` (preview production build)
- **Dependencies**: React 19, D3.js for visualizations, React Router for routing
- **DevDependencies**: TypeScript, Vite, ESLint, SASS compiler, and type definitions

#### eslint.config.js
ESLint configuration for code quality and consistency. Uses the new flat config format with:
- **TypeScript support**: Extends TypeScript ESLint recommended rules
- **React plugins**: React Hooks rules and React Refresh for Vite
- **File targeting**: Applies rules to `.ts` and `.tsx` files
- **Global ignores**: Excludes `dist` folder from linting
```
