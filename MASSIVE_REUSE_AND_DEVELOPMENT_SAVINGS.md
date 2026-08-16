# Massive Reuse and Development Savings

## 1. Summary

This project should aim to avoid writing general-purpose engine code that already exists in mature open-source libraries. The editor-specific product layer is the custom work; the heavy technical infrastructure should be borrowed and adapted.

## 2. Estimated savings by category

| Category | Reuse path | Est. time saved | Est. custom code avoided |
| --- | --- | --- | --- |
| Motion engine | motion-canvas | 2-3 months | ~20k LOC |
| Transitions | gl-transitions | 2 months | ~18k LOC |
| Audio processing | Tone.js | 1-2 months | ~15k LOC |
| Export | mediabunny | 1-2 months | ~35k LOC |
| Database | Dexie.js | 2-4 weeks | ~6k LOC |
| Lottie overlays | dotlottie-web | 1 week | ~6k LOC |
| Keyboard system | react-hotkeys-hook | 3-5 days | ~8k LOC |
| Waveform UI | wavesurfer.js | 1-2 weeks | ~10k LOC |
| Collaboration | Yjs | 2-3 weeks | ~15k LOC |

### Overall
- roughly 20-25 months of engineering effort saved
- roughly 100k+ lines of custom code avoided
- significantly reduced maintenance burden
- much faster shipping timeline

## 3. Why this is the correct tradeoff

The product is an editor, not a custom engine company. Reusing high-quality libraries saves time and increases confidence in rendering, export, and media handling.

The custom layer should be focused on:
- timeline workflow
- editing UX
- metadata-based presets
- search-first navigation
- social media export presets

## 4. Future updates to keep adding

- user preset library
- project version restore
- export presets per platform
- simplified panel structure
- better preset browser cards
- waveform trimming and audio controls
- render worker queue
- real-time collaboration
- local AI workflow tools

## 5. Recommendation

Keep a very strict reuse-first rule: if a mature library solves it, prefer that library, and keep custom code for user-facing editor logic only.
