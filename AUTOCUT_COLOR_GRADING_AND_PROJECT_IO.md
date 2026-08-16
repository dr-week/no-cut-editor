# Auto-Cut AI, Color Grading & Project IO Documentation (2026+)

## 1. Auto-Cut Silence Detector Engine
The Auto-Cut engine analyzes the audio decibel envelope across all audio/video tracks:
- **Threshold**: Configurable between $-20\text{ dB}$ and $-50\text{ dB}$ (Default: $-32\text{ dB}$).
- **Action**: Automatically splits clips and executes ripple-deletes across silent dead gaps to create fast, retention-optimized short-form edits.

---

## 2. Professional Color Grading & 3D LUT Pipeline
OpenCut provides real-time GLSL fragment shader sliders for Hollywood-grade visual control:
- **Exposure**: $-100$ to $+100$
- **Contrast**: $-100$ to $+100$
- **Highlights & Shadows**: Dual-curve tonal range recovery
- **Temperature & Tint**: Kelvins warm/cool balance & green/magenta tinting
- **Saturation**: Full color vibrancy control
- **Vignette**: Radial optical falloff
- **3D LUTs Supported**: `.cube` profiles including *Teal & Orange Cinematic*, *Kodak Portra 400*, *Fuji Velvia 50*, and *Cyberpunk Neon*.

---

## 3. Advanced Studio Audio DSP & Voice Controls
- **AI Voice Auto-Ducking**: Automatically drops background music when vocal frequencies are detected.
- **AI Studio Vocal Enhancer**: Real-time vocal formant boosting and resonance clarity.
- **Smart Noise Gate & De-Esser**: Eliminates room hiss below $-30\text{ dB}$ and tames harsh sibilance.

---

## 4. Project State Import & Export (`.json`)
Projects are serialized to portable JSON structures capturing clips, text nodes, 3D LUT parameters, audio equalizer bands, and trend settings.

---

## 5. Automated Chain-Reaction Verification

- **Vitest Suite**: **15 passed out of 15 tests** (`15 passed (15)`).
- Run launcher anytime: **[Launch-OpenCut.bat](file:///d:/CODES/openCUT/Launch-OpenCut.bat)**.
