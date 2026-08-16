<table width="100%">
  <tr>
    <td align="left" width="120">
      <img src="https://assets.nocut.app/branding/symbol.svg" alt="NOCUT Logo" width="100" />
    </td>
    <td align="right">
      <h1>NOCUT (OpenCut)</h1>
      <h3 style="margin-top: -10px;">Video editing is fundamentally broken. We're fixing it.</h3>
    </td>
  </tr>
</table>

[![Discord](https://img.shields.io/badge/Discord-Join%20the%20Resistance-5865F2?logo=discord&logoColor=fff&style=flat)](https://discord.gg/g8RA4A4V3)
[![X](https://img.shields.io/badge/follow-%40nocutapp-000?logo=x&logoColor=fff&style=flat)](https://x.com/nocutapp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat)](LICENSE)

---

## 💥 The Industry Manifesto: Why Video Editors Suck Today

Let's stop pretending: **modern video editing software is an overpriced, bloated hostage situation.**

- **Adobe Premiere Pro** crashes when you look at it wrong, charges you a monthly rent for life, and still uses a rendering pipeline designed during the Bush administration.
- **CapCut** treats your privacy like an open buffet and locks basic keyframes behind shady subscription walls.
- **DaVinci Resolve** requires a NASA supercomputer and a 400-page manual just to trim a 10-second vertical TikTok clip.
- **Web editors (Descript, Clipchamp, Canva)** hold your media hostage in the cloud, slap watermarks on your exports, lag on 1080p timelines, and charge $30/month for basic auto-captions you could run locally on a toaster.

**NOCUT is the unapologetic open-source answer.** No subscriptions. No cloud surveillance. No paywalled exports. No bloatware. Pure raw performance directly in your browser, desktop, or automated pipelines.

---

## ⚡ What We Actually Shipped (No Corporate Fluff)

We don't sell vaporware roadmap promises. This is running right now in `apps/web`:

- **Zero-Bloat Core:** Instant-boot timeline engine running on WebGPU, WebCodecs, and WebAudio. Zero server round-trips for your edits.
- **One-Click AI Director & Auto-Cut:** Instant beat-sync detection, silence/dead-air razor trimming (`speechTranscriptEngine.ts`), and intelligent audio normalization.
- **Magnetic Snap & Ripple Trimming:** Sub-millisecond timeline snapping (`timelineSnap.ts`) with zero UI lag.
- **141+ Dynamic Motion Presets & Shaders:** 3D parallax, kinetic typography, CRT/VHS scanlines, and Hollywood 3D LUTs without downloading gigabytes of templates.
- **Smart 9:16 Reframe Engine:** Normalized subject tracking and aspect crop engine (`smartReframeEngine.ts`) that turns horizontal clips into viral vertical Shorts automatically.
- **Parallel Chunked WebCodecs Exporter:** Slices timeline rendering across multi-threaded workers (`mediaProcessingEngine.ts`) for ultra-fast exports.
- **Automated Validation Gateway:** 100% test-verified with **134/134 passing tests across 12 suites** via `node tools/chain-reaction.mjs`.

---

## 🛠️ Quickstart / Development

Run the entire suite locally without paying a single cent to a SaaS monopoly:

Install [proto](https://moonrepo.dev/proto):

**Linux, macOS, WSL:**
```sh
bash <(curl -fsSL https://moonrepo.dev/install/proto.sh)
```

**Windows (PowerShell):**
```powershell
irm https://moonrepo.dev/install/proto.ps1 | iex
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Boot the engines:
```sh
proto use
moon run web:dev       # localhost:5173
```

### 🛡️ One-Shot Chain-Reaction Verification
Run strict TypeScript typechecks, 12 test suites, and client+SSR production builds in ~10 seconds:
```sh
node tools/chain-reaction.mjs
```

---

## 🗣️ Join the Community / Fight the Bloat

Tired of subscription paywalls and software crashing on export?

- 💬 **Discord:** [Join the Discord](https://discord.gg/g8RA4A4V3) — discuss features, build plugins, roast proprietary software.
- 🐛 **Issues & Pull Requests:** [GitHub Issues](https://github.com/nocutapp/nocut/issues)

---

## 📄 License

MIT © NOCUT Contributors. Free forever. No catch.
