# MDC - Modern Design Components

## Project Overview

MDC (Modern Design Components) is a component library built with React and TypeScript using modern tooling. It provides a collection of reusable UI components that follow design best practices and are built for both performance and accessibility.

## Technology Stack

- **Core Technologies**

  - React 19
  - TypeScript
  - Vite (for fast development and optimized builds)

- **UI Framework**

  - Tailwind CSS 4 (with the following plugins)
    - tailwindcss-animate
    - class-variance-authority
    - tailwind-merge
    - clsx

- **Component Design System**

  - Shadcn/UI approach (using components.json configuration)
  - Radix UI primitives (for accessible components)
  - Lucide icons integration

- **Documentation and Testing**

  - Storybook 8 (for component documentation and visual testing)
  - Vitest (for unit and component testing)
  - Playwright (for browser-based testing)
  - MSW (Mock Service Worker for API mocking)

- **Code Quality**

  - ESLint 9 (for code linting)
  - TypeScript strict mode
  - Storybook test addon

- **Deployment**
  - Vercel (configured for storybook deployment)

## Project Structure

```
mdc/
├── .storybook/           # Storybook configuration
├── docs/                 # Project documentation
├── public/               # Static assets
├── src/                  # Source code
│   ├── assets/           # Images and other assets
│   ├── components/       # React components
│   │   └── ui/           # UI components (button, pagination, etc.)
│   ├── lib/              # Utility functions and helpers
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── .vercel/              # Vercel deployment configuration
└── storybook-static/     # Built Storybook output (for deployment)
```

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd mdc

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Start Storybook
npm run storybook
```

### Building

```bash
# Build the project
npm run build

# Build Storybook
npm run build-storybook
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally
- `npm run storybook` - Start Storybook for component development
- `npm run build-storybook` - Build Storybook for deployment

## Component Structure

Components in this library follow a consistent structure:

- Each UI component has its own directory or file in `src/components/ui/`
- Component implementations are in `.tsx` files
- Stories for Storybook documentation are in `.stories.tsx` files
- Tests are integrated with Storybook for visual testing

## Deployment

The project is configured to deploy to Vercel, with Storybook as the main deployment artifact. This provides an interactive component documentation site that can be shared with stakeholders and development teams.

## Style Customization

The component library uses Tailwind CSS with customizable themes. The main styling configuration is in:

- `components.json` - For shadcn/ui configuration
- `src/index.css` - For global styles and Tailwind configuration

## Contributing

Guidelines for contributing to this project:

1. Follow the established component patterns
2. Include Storybook stories for any new components
3. Ensure components are accessible
4. Write tests for your components
5. Follow the project's code style and linting rules
