# OpenCut Documentation Index

This file is the canonical index for the planning, architecture, workflow, and integration documents used across the project.

## Core product and architecture
- [README.md](README.md) — project overview and top-level entry point
- [ARCHITECTURE.md](ARCHITECTURE.md) — system architecture and core component relationships
- [FEATURE_MAP.md](FEATURE_MAP.md) — feature coverage and feature ownership
- [PROJECT_STATE.md](PROJECT_STATE.md) — current implementation state
- [MASTER_PLAN.md](MASTER_PLAN.md) — strategic plan and sequencing
- [NEXT_STEPS_PLAN.md](NEXT_STEPS_PLAN.md) — immediate next milestones and delivery priorities
- [FUTURE_ROADMAP_AND_ARCHITECTURE.md](FUTURE_ROADMAP_AND_ARCHITECTURE.md) — long-horizon roadmap and architecture evolution

## Workflow and engineering
- [DEVELOPMENT.md](DEVELOPMENT.md) — day-to-day engineering workflow
- [SETUP.md](SETUP.md) — setup and local environment instructions
- [TESTING_STRATEGY.md](TESTING_STRATEGY.md) — validation strategy and test coverage expectations
- [AUTOMATION_AND_CHAIN_REACTIONS.md](AUTOMATION_AND_CHAIN_REACTIONS.md) — automated verification and stable release gates
- [TECHNICAL_DEBT_AND_BUG_AUDIT.md](TECHNICAL_DEBT_AND_BUG_AUDIT.md) — debt list, risks, and issue tracking
- [PERFORMANCE_ROADMAP.md](PERFORMANCE_ROADMAP.md) — performance strategy
- [VIDEO_COMPRESSION_PLAN.md](VIDEO_COMPRESSION_PLAN.md) — export, compression, and media pipeline strategy
- [BACKEND_ENGINE_ROADMAP.md](BACKEND_ENGINE_ROADMAP.md) — backend and render-server roadmap

## UI and editor workflow
- [UI_SIMPLIFICATION_PLAN.md](UI_SIMPLIFICATION_PLAN.md) — minimal UI and clutter reduction strategy
- [KEYBOARD_SHORTCUTS.md](KEYBOARD_SHORTCUTS.md) — editor shortcuts and power-user controls
- [SHORTCUTS.md](SHORTCUTS.md) — shortcut registry summary and central keyboard model
- [TRANSFORMS_AND_EFFECTS.md](TRANSFORMS_AND_EFFECTS.md) — transform and effect capability map
- [CANVA_MOTION_GRAPHICS.md](CANVA_MOTION_GRAPHICS.md) — motion graphics usage and design system
- [MOTION_GRAPHICS_AND_PERFORMANCE_ENGINE.md](MOTION_GRAPHICS_AND_PERFORMANCE_ENGINE.md) — performance-tuned motion system
- [AUTOCUT_COLOR_GRADING_AND_PROJECT_IO.md](AUTOCUT_COLOR_GRADING_AND_PROJECT_IO.md) — grading, media import, and project I/O

## AI, automation, and creative systems
- [AI_MCP_SERVER_SPEC.md](AI_MCP_SERVER_SPEC.md) — AI and MCP server design
- [LOW_LITE_INTERNAL_AI_ARCHITECTURE.md](LOW_LITE_INTERNAL_AI_ARCHITECTURE.md) — internal AI architecture
- [TREND_ENGINE_AND_AI_TEMPLATES.md](TREND_ENGINE_AND_AI_TEMPLATES.md) — trend-driven template generation
- [ZERO_CODE_ROADMAP.md](ZERO_CODE_ROADMAP.md) — zero-code and preset-driven direction
- [MASTER_ZERO_CODE_ROADMAP.md](MASTER_ZERO_CODE_ROADMAP.md) — broader zero-code plan
- [ZERO_CODE_INTEGRATION.md](ZERO_CODE_INTEGRATION.md) — external zero-code tools and integration strategy

## Open-source and reuse strategy
- [GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md](GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md) — GitHub and OSS integration directory
- [INTEGRATIONS.md](INTEGRATIONS.md) — integration log with status and effort saved
- [DEVELOPMENT_SAVINGS.md](DEVELOPMENT_SAVINGS.md) — savings from reuse instead of custom build
- [OPEN_SOURCE_ROI_AND_PRESETS.md](OPEN_SOURCE_ROI_AND_PRESETS.md) — ROI and preset reuse strategy
- [REPOS_INTEGRATION.md](REPOS_INTEGRATION.md) — repo integration overview
- [REPOS_STEAL_INDEX.md](REPOS_STEAL_INDEX.md) — source repositories worth studying and reusing
- [STEAL_LIKE_AN_ARTIST_TOOLS.md](STEAL_LIKE_AN_ARTIST_TOOLS.md) — reuse-first tooling strategy

## Stack and platform strategy
- [2026_TECH_STACK.md](2026_TECH_STACK.md) — 2026 platform and stack plan
- [MULTI_LANGUAGE_TECH_STACK_2026.md](MULTI_LANGUAGE_TECH_STACK_2026.md) — multi-language runtime and backend stack
- [LANGUAGES_FOR_DEVELOPMENT.md](LANGUAGES_FOR_DEVELOPMENT.md) — language decisions and rationale
- [CHAIN_REACTION_PLAN.md](CHAIN_REACTION_PLAN.md) — chain reaction execution model
- [PARALLEL_CHAIN_REACTION.md](PARALLEL_CHAIN_REACTION.md) — parallel verification and workflow execution

## Repository-specific references
- [Launch-OpenCut.bat](Launch-OpenCut.bat) — quick Windows launcher
- [Launch-OpenCut.ps1](Launch-OpenCut.ps1) — PowerShell launcher
- [tools/chain-reaction.mjs](tools/chain-reaction.mjs) — automated verification pipeline

## Documentation principles
- Prefer reuse over custom build
- Keep code and planning docs synchronized
- Maintain a low-code, data-driven foundation
- Use ecosystems and libraries before writing custom equivalents
- Keep this index updated whenever a new planning or architecture document is added
