# Functional Components

This directory contains higher-level functional components that implement actual behavior and logic on top of the UI components from shadcn/ui.

## Two-Tier Component Architecture

Our component library follows a two-tier architecture:

1. **UI Components (Level 1)** - Located in `/src/components/ui/`

   - Basic UI building blocks from shadcn/ui
   - Provide visual elements without much functionality
   - Focus on styling, accessibility, and theming
   - Examples: Button, Pagination UI, Card, etc.

2. **Functional Components (Level 2)** - Located in this directory
   - Implement actual functionality on top of UI components
   - Handle state management, data fetching, and business logic
   - Provide a higher-level API for application developers
   - Examples: DataTable (using Table UI), OffsetPagination (using Pagination UI), etc.

## Directory Structure

Each functional component type has its own directory:

```
src/components/functional/
├── pagination/         # Pagination components (offset and cursor-based)
│   ├── README.md       # Documentation for pagination components
│   ├── types.ts        # Type definitions
│   ├── utils.ts        # Utility functions
│   ├── index.ts        # Exports
│   └── ...             # Component implementations
├── [future-component]/ # Future functional components
│   └── ...
└── README.md           # This file
```

## Storybook Integration

Our functional components include comprehensive Storybook integration:

### Controls

Each component is configured with Storybook controls that allow you to:

- Modify component props interactively
- Test different configurations
- Visualize component behavior with different inputs

### Actions

Components log important events to the Storybook Actions panel:

- User interactions (clicks, form submissions)
- State changes
- Callback invocations

This makes it easy to verify that components behave as expected.

## Testing

Functional components include comprehensive test coverage:

- **Unit Tests**: Testing the core functionality of each component
- **Integration Tests**: Testing how components work together
- **Edge Cases**: Testing boundary conditions and error states

Tests are located alongside the components they test and can be run with:

```bash
npm run test
```

## Usage

Import functional components from this directory, not directly from UI:

```tsx
// ✅ DO: Use functional components for actual functionality
import { OffsetPagination } from "@/components/functional/pagination";

// ❌ DON'T: Use UI components directly for complex functionality
// import { Pagination, PaginationContent, ... } from '@/components/ui/pagination';
```

## Adding New Functional Components

When adding new functional components:

1. Create a new directory for the component type (if needed)
2. Implement the component using UI components as building blocks
3. Create a README.md file explaining how to use the component
4. Add TypeScript types and utility functions as needed
5. Add Storybook stories with controls and actions
6. Write comprehensive tests
7. Export the component via an index.ts file

## Benefits of Two-Tier Architecture

- **Separation of concerns**: UI components focus on presentation; functional components handle behavior
- **Reusability**: UI components can be reused in multiple functional contexts
- **Maintainability**: Changes to UI components don't break functional implementation
- **Developer experience**: Application developers have higher-level components available that implement common patterns
