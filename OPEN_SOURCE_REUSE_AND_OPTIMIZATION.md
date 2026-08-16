# Open Source Reuse and Time-Saving Summary

## Strategy context
This file is the concise summary of the project’s reuse-first policy. It reflects the same direction documented in:
- [MASTER_PLAN.md](MASTER_PLAN.md)
- [PROJECT_STATE.md](PROJECT_STATE.md)
- [GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md](GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md)
- [INTEGRATIONS.md](INTEGRATIONS.md)
- [DEV_TIME_SAVINGS_REPORT.md](DEV_TIME_SAVINGS_REPORT.md)

## Executive summary

The fastest path for the NOCUT editor is not to build everything from scratch. The project already follows the correct strategy: use a small custom shell, but lean heavily on open-source libraries for the heavy technical work.

This reduces the amount of custom engineering while preserving a polished, creative editing experience.

## Reuse-first stack

### Media, motion, and export
- motion-canvas / motion-canvas for motion primitives and timing
- gl-transitions / gl-transitions for professional shader-based transitions
- mediabunny / mediabunny for export and media handling
- remotion for timeline-related composition and preview

### Audio and waveform
- Tonejs / Tone.js for EQ, ducking, filter chains, and sound design
- katspaugh / wavesurfer.js for waveform visualization in the timeline

### UI and workflow
- react-hotkeys-hook for keyboard handling
- Dexie.js for autosave and project versioning
- dotlottie-web for vector animation overlays and stickers

### Collaboration and real-time state
- yjs / yjs for live shared editing state

## Estimated engineering time saved

| Area | Library / repo | Time saved |
| --- | --- | --- |
| Motion design | motion-canvas | 2-3 months |
| Transition library | gl-transitions | 2 months |
| Audio processing | Tone.js | 1-2 months |
| Export pipeline | mediabunny | 1-2 months |
| Project persistence | Dexie.js | 2-4 weeks |
| Lottie/vector overlays | dotlottie-web | 1 week |
| Keyboard binding | react-hotkeys-hook | 3-5 days |
| Waveform UI | wavesurfer.js | 1-2 weeks |
| Collaboration | Yjs | 2-3 weeks |

### Approximate total savings
- 20-25 months of senior engineering effort avoided
- 100k+ lines of custom code avoided across the editor stack
- Fastest path to a polished editor with a smaller maintenance surface

## Why this is the correct strategy

- Several of these features are already mature and tested by long-lived OSS projects.
- New custom code should focus on product behavior, not general-purpose engine features.
- Metadata-driven registries reduce branching and keep the app maintainable.
- The open-source ecosystem gives more time for UX improvements and product polish.

## Recommended next integration order

1. react-hotkeys-hook
2. wavesurfer.js
3. Dexie.js
4. dotlottie-web
5. Tone.js
6. mediabunny
7. Yjs

This order reduces workflow friction while leaving the biggest render/export gains for later when the project is more mature.

## Development rule to keep

Do not build a new engine if a proven library already satisfies the need. Build the editor-specific orchestration layer only.
