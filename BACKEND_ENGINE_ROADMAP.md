# Backend Engine Roadmap

## Phase 1: Current editor hardening
- Keep current UI and timeline structure stable
- Improve timeline editing performance
- Add worker offloading for heavy media work
- Optimize render loops and garbage collection

## Phase 2: WebCodecs production path
- Direct `VideoEncoder` / `AudioEncoder` rendering pipeline
- Replace some MediaRecorder reliance with true hardware-accelerated export
- Add worker-managed encoding queue
- Add render previews and progress states

## Phase 3: GPU and performance
- WebGPU/WebGL rendering backend selection
- High-performance transition and LUT pipeline
- Frame-drop telemetry and performance metrics
- Better caching and thumbnails

## Phase 4: compression and media optimization
- Resolution presets
- Bitrate presets
- Proxy media generation
- Fast display pipeline for large projects

## Phase 5: scale
- Cloud render workers
- Background job queue
- Collaboration pipeline
- Large project support
