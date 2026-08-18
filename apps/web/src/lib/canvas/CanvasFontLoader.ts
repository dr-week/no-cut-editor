/**
 * @file CanvasFontLoader.ts
 * @description Google Fonts dynamic injection using WebFontLoader.
 * Fetches and loads Google Font families at runtime into the document
 * and Konva canvas context, enabling real typography on the video stage.
 * @module apps/web/src/lib/canvas/CanvasFontLoader
 */

import WebFont from "webfontloader";

export const SAAS_MOTION_FONTS = [
  "Inter",
  "Montserrat",
  "Space Grotesk",
  "Sora",
  "Plus Jakarta Sans",
  "Outfit",
  "DM Sans",
  "Raleway",
  "Bebas Neue",
  "Permanent Marker",
];

/**
 * Dynamically loads one or more Google Font families into the document.
 * Resolves when fonts are ready to paint on Canvas / Konva.
 */
export function loadGoogleFonts(families: string[] = SAAS_MOTION_FONTS): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") { resolve(); return; }

    // Fix #11: skip if already loaded (HMR / re-mount guard)
    const firstFont = families[0] ?? "Inter";
    if (document.fonts.check(`12px "${firstFont}"`)) { resolve(); return; }

    // Fix #11: 3-second timeout prevents silent hang under CSP
    const timer = setTimeout(() => { console.warn("WebFontLoader: timeout, using system fonts."); resolve(); }, 3000);

    WebFont.load({
      google: { families: families.map((f) => `${f}:400,600,700,900`) },
      active: () => { clearTimeout(timer); resolve(); },
      inactive: () => { clearTimeout(timer); console.warn("WebFontLoader: fonts failed, using fallback."); resolve(); },
    });
  });
}

/**
 * Preloads the default SaaS Motion Graphics font stack on editor mount.
 */
export async function preloadSaaSFonts(): Promise<void> {
  await loadGoogleFonts([
    "Inter",
    "Montserrat",
    "Space Grotesk",
    "Bebas Neue",
  ]);
}
