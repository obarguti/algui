# AlgUI

A modern React application built with TypeScript, Vite, and SASS (SCSS).

## Tech Stack

- **Framework**: React 19+ with TypeScript
- **Build Tool**: Vite
- **Styling**: SASS/SCSS
- **Package Manager**: npm

## Features

- ⚡ Fast development with Vite HMR
- 🎨 SASS/SCSS styling with variables and mixins
- 📦 TypeScript for type safety
- 🔧 ESLint for code quality
- 🚀 Optimized production builds

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
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
