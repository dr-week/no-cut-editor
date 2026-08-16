# Future Backend and UI Updates for NOCUT

## 1. Immediate product/UI updates

- Add preset search panel inside command palette
- Add more controls for animation timing, easing, duration, and blend mode
- Add effect presets by category: motion, film, color, audio, social
- Add UI toggle for showing advanced controls only when needed
- Add keyboard shortcut help modal with live search
- Add one-click social export presets
- Add timeline quick actions for trim, split, duplicate, and ripple delete
- Add waveform and audio gain controls in the timeline panel
- Add project autosave indicator and restore history

## 2. Backend updates

- Worker-based export processing queue
- Project snapshot restore system
- User preset library and import/export
- Template metadata and platform-safe export sizes
- Analytics for playback health, dropped frames, and render duration
- Local AI microservices for subtitle generation and smart reframing
- Optional cloud sync for user templates and saved projects

## 3. Feature ideas to reduce custom dev work

- Use open-source transition libraries rather than writing custom shader packs
- Use reusable keyboard libraries and preset metadata instead of bespoke logic
- Use off-the-shelf waveform, motion, and audio integrations
- Keep the custom code layer focused on editor-specific workflows and UX polish

## 4. Code optimization goals

- Reduce duplicate search/filter logic
- Keep action registry and preset registry as source-of-truth
- Add memoization around filtered lists
- Separate UI rendering from domain logic
- Use kebab-case/metadata-driven actions for faster extension

## 5. Near-term roadmap

### Sprint 2
- integrate preset browser into UI
- add shortcut overlay
- add more animation and effect presets
- improve controls and progressive disclosure

### Sprint 3
- integrate audio waveform support
- project versioning and autosave snapshots
- user preset storage and import/export

### Sprint 4+
- Tone.js audio processing
- mediabunny export
- Yjs collaboration
- AI-assisted editing helpers
