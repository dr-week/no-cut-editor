# Performance Roadmap

## Core goals
- Keep UI responsive during editing
- Avoid dropped frames during preview
- Reduce re-renders and event churn
- Offload heavy work to workers

## Immediate improvements
- Memoize expensive preset filters
- Keep command/search registry lightweight
- Minimize UI panel mounting in minimal mode
- Reduce repeated render passes in large timelines

## Next improvements
- Web worker decode/encode pipeline
- GPU-backed preview path selection
- Shared cache and media indexing
- Use compressed project snapshots

## Advanced improvements
- Proxy media generation
- Cloud render job scheduling
- Frame sampling and optimization pass
- Multi-track performance tuning
