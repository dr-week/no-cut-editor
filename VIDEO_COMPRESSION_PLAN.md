# Video Compression Plan

## Goals
- Maintain visual quality while reducing file size
- Make export presets usable for social media and production output
- Support both WebM and MP4 workflows

## Preset strategy
- Balanced: default general-purpose export
- Best Quality: high bitrate and 60 FPS
- Small File: lower bitrate for quick sharing
- Web/Mobile: optimized for web playback and mobile devices

## Technical direction
- Prefer WebCodecs-based encoding for local hardware acceleration
- Use FFmpeg WASM fallback for broad compatibility
- Keep user-facing presets simple and production-friendly

## Outputs
- MP4 H.264
- WebM VP9
- Quality estimates before export
- Per-platform presets for TikTok, Reels, YouTube, and social distribution
