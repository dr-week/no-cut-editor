# Testing Strategy

## Core principles
- Test real editor behavior, not mocked UI-only states
- Cover timeline actions, keyboard bindings, filters, and undo/redo
- Validate preset generation and rendering decisions
- Keep small, fast unit and integration checks

## Required areas
- Timeline operations
- Split, duplicate, delete, ripple delete
- Undo/redo state transitions
- Search and command registry matching
- Shortcut handling and key guard logic
- Preset generation and template creation
- Rendering metadata and export inputs

## Automation flow
- format
- lint
- typecheck
- tests
- schema validation
- preset validation
- build
- performance sanity checks
