# Development Savings Tracker

## Goal
Track the estimated value of reusing proven open-source work instead of rebuilding systems from scratch.

| Component | Build from scratch | Integration estimate | Estimated saved time | LOC avoided | Status |
| --- | --- | --- | --- | --- | --- |
| Video decoding pipeline | 4-6 weeks | 1-2 weeks | 2-4 weeks | 8k-15k | Planned |
| Export pipeline | 3-5 weeks | 1-2 weeks | 2-3 weeks | 8k-12k | Partial |
| Timeline primitives | 4-6 weeks | 1-2 weeks | 2-4 weeks | 10k-18k | Partial |
| Keyframe graph editor | 3-4 weeks | 1 week | 2-3 weeks | 6k-12k | Implemented |
| Effects library | 3-5 weeks | 1-2 weeks | 2-3 weeks | 8k-15k | Partial |
| Transition shaders | 2-4 weeks | 0.5-1 week | 1-3 weeks | 6k-12k | Partial |
| Audio DSP | 3-5 weeks | 1 week | 2-4 weeks | 8k-15k | Partial |
| Waveform / regions | 2-3 weeks | 1 week | 1-2 weeks | 4k-10k | Planned |
| Project persistence | 1-2 weeks | 0.5 week | 0.5-1.5 weeks | 2k-6k | Implemented |
| Testing infrastructure | 2-3 weeks | 0.5-1 week | 1-2 weeks | 3k-8k | Partial |

## Total estimate
- Estimated engineering time saved: 20-30 weeks across the main stack
- Estimated custom LOC avoided: 60k-120k+
- Estimated maintenance saved: high
- Net result: reuse-first strategy materially reduces custom code and speeds feature delivery

## Verification rule
Savings claims should only be recorded after the integration is actually verified in the repo and not just identified as a possible library.
