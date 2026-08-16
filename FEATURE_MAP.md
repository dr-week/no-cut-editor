# OpenCut Feature Map: Filmora Ease + Premiere Pro Control

This matrix maps user features to their source components and design goals.

---

## Feature Matrix

| Feature | Filmora Element (Simple) | Premiere Pro Element (Precise) | Source Component |
| --- | --- | --- | --- |
| **Multi-Track Timeline** | Stacked media cards | Layered V1/V2/A1/A2 tracks with snapping | `packages/nextjs-video-editor` |
| **Clip Trimming** | Quick split button | Frame-by-frame drag handles & playhead scrub | `packages/nextjs-video-editor` |
| **Color Grading & Shaders** | 1-click preset filters | Contrast, saturation, brightness GPU sliders | `packages/rendr` |
| **Text & Titles** | Animated text presets | Custom font, stroke, shadow & position handles | `apps/web/src/components` |
| **Video Export** | Quick MP4 export | Custom resolution, frame rate, & bitrate | `@ffmpeg/ffmpeg` |

---

## Integration Blueprint

```
OpenCut Web App (apps/web)
├── Timeline (from nextjs-video-editor)
├── WebGL Preview (from rendr)
├── Text & Effects Sidebars (Filmora UI)
└── FFmpeg Export Engine (@ffmpeg/ffmpeg)
```
