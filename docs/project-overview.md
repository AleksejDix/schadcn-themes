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

## Component Architecture

MDC follows a two-tier component architecture:

1. **UI Components (Level 1)** - Located in `/src/components/ui/`

   - Basic UI building blocks from shadcn/ui
   - Provide visual elements without much functionality
   - Focus on styling, accessibility, and theming
   - Examples: Button, Pagination UI, Card, etc.

2. **Functional Components (Level 2)** - Located in `/src/components/functional/`
   - Implement actual functionality on top of UI components
   - Handle state management, data fetching, and business logic
   - Provide a higher-level API for application developers
   - Examples: DataTable, OffsetPagination, CursorPagination, etc.

This architecture provides several benefits:

- **Separation of concerns**: UI components focus on presentation; functional components handle behavior
- **Reusability**: UI components can be reused in multiple functional contexts
- **Maintainability**: Changes to UI components don't break functional implementation
- **Developer experience**: Application developers have higher-level components available that implement common patterns

## Component Documentation and Testing

Each component in MDC is thoroughly documented and tested:

### Storybook Integration

- **Interactive Documentation**: Components are showcased in Storybook with interactive examples
- **Controls**: Dynamic props can be adjusted in real-time to see how components respond
- **Actions**: Component events are logged to make it easy to verify behavior
- **Accessibility Testing**: A11y checks are built into the documentation

### Automated Testing

- **Unit Tests**: Test individual component functionality
- **Visual Regression Tests**: Compare visual output against baselines
- **Integration Tests**: Test component interactions
- **Edge Case Tests**: Verify behavior under unusual conditions

### Component Documentation

- **Usage Examples**: Clear examples showing how to use components
- **Props Documentation**: Detailed documentation of all component props
- **API Reference**: Complete API reference for each component
- **Design Patterns**: Guidance on component usage patterns

## Project Structure

```
mdc/
├── .storybook/           # Storybook configuration
├── docs/                 # Project documentation
├── public/               # Static assets
├── src/                  # Source code
│   ├── assets/           # Images and other assets
│   ├── components/       # React components
│   │   ├── ui/           # UI components (Level 1)
│   │   └── functional/   # Functional components (Level 2)
│   ├── lib/              # Utility functions and helpers
│   ├── test/             # Test setup and helpers
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

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
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
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage reporting

## Component Structure

Components in this library follow a consistent structure:

- Each UI component has its own directory or file in `src/components/ui/`
- Component implementations are in `.tsx` files
- Stories for Storybook documentation are in `.stories.tsx` files
- Tests are integrated with Storybook for visual testing and in separate `.test.tsx` files

Functional components are organized by type in `src/components/functional/`:

- Each functional component type has its own directory
- Each directory includes a README with usage examples
- Complex functionality is broken down into multiple files
- Types, utilities, and implementation are separated for clarity
- Tests validate functionality and edge cases

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
