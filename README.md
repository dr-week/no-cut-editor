<table width="100%">
  <tr>
    <td align="left" width="120">
      <img src="https://assets.nocut.app/branding/symbol.svg" alt="NOCUT Logo" width="100" />
    </td>
    <td align="right">
      <h1>NOCUT</h1>
      <h3 style="margin-top: -10px;">A free and open source video editor for web, desktop, and mobile.</h3>
    </td>
  </tr>
</table>

[![Discord](https://img.shields.io/discord/1386309140057690133?label=Discord&logo=discord&logoColor=fff&color=5865F2&style=flat)](https://discord.gg/zmR9N35cjK)
[![X](https://img.shields.io/badge/follow-%40nocutapp-000?logo=x&logoColor=fff&style=flat)](https://x.com/nocutapp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat)](LICENSE)

## Status

**NOCUT is a professional browser video editor.** What's shipped:

- An Editor API
- First-class third party plugins (made possible by a plugin-first architecture)
- Desktop, mobile, and browser from one codebase (Rust core)
- MCP server (for AI agents)
- Headless mode (automation, batch rendering)
- A scripting tab directly in the editor

**Already shipped in `apps/web`**: one-click AUTO EDIT engine (beat-sync / viral / clean / documentary), **Director Engine** (cinematic storyboard cut), **Auto Improve** (grade + vocal + normalize), 136 animation presets, 54 templates, 63 effects, 38 transitions, 12 3D LUTs, random trend-template generator + save-as-template, keyframe graph editor, Premiere Pro-style shortcuts (J/K/L shuttle, S split, N snap, Home/End), searchable motion-graphics picker with category filters, render-backend selector (DirectX12·WebGPU / CUDA·WebCodecs / WebGL2 / WASM), video compression presets, focus (minimal) mode, Dexie.js autosave, MediaRecorder video export, loop/snap transport, 5-band EQ, and a 66-test chain-reaction (`node tools/chain-reaction.mjs`).

You can still find the previous version at [opencut-app/opencut-classic](https://github.com/opencut-app/opencut-classic), which is the one to reach for today. [opencut.app](https://opencut.app) still runs the classic version. The rewrite will live at [new.opencut.app](https://new.opencut.app) until it's ready to take over.

## Development

Install [proto](https://moonrepo.dev/proto) if you haven't already:

**Linux, macOS, WSL:**

```sh
bash <(curl -fsSL https://moonrepo.dev/install/proto.sh)
```

**Windows (PowerShell):**

```powershell
irm https://moonrepo.dev/install/proto.ps1 | iex
```

If shims fail to run, allow local scripts for your user:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

From the repo root:

```sh
proto use    # installs the tools pinned in .prototools
```

```sh
moon run web:dev       # localhost:5173
moon run api:dev       # localhost:8787
moon run desktop:dev   # see apps/desktop/README.md
```

## Contributing

We're open to contributions! If you want to follow along, ask questions, or get involved, [join the Discord](https://discord.gg/zmR9N35cjK) or [open an issue](https://github.com/nocutapp/nocut/issues).

## Sponsors

NOCUT is supported by companies that believe in open source creator tools.

- [**fal.ai**](https://fal.ai?utm_source=github-nocut&utm_campaign=oss): Generative image, video, and audio models all in one place.

Want your logo here? Reach out at [sponsor@nocut.app](mailto:sponsor@nocut.app).

## License

[MIT](LICENSE)
