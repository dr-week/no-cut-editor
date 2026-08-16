# Technical Debt and Bug Audit

## Current observations
- The editor already contains a large feature set, so the main debt area is not raw missing functionality but UI sprawl and workflow clarity.
- Too many controls are visible at once; minimal-mode disclosure is the right fix.
- Search and command entry are still relatively shallow compared with professional NLE tooling.
- Export and performance upgrades are queued, not yet principal in the default workflow.

## Priority fixes
- Consolidate panel logic and reduce default clutter
- Add a search-first action model
- Add keyboard guards for input fields
- Keep timeline logic small and deterministic
- Continue validating performance under larger projects
- Track worker/off-main-thread work clearly

## Higher-risk areas to watch
- Audio/video sync drift
- WebCodecs memory lifecycle
- Unbounded re-renders during large timelines
- Tool-state drift when many panels are open
- Search performance as the preset list grows
