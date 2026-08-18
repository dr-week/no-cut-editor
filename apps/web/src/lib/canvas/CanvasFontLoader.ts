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
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    WebFont.load({
      google: {
        families: families.map((f) => `${f}:400,600,700,900`),
      },
      active: () => resolve(),
      inactive: () => {
        console.warn("WebFontLoader: Some fonts failed to load, using fallback.");
        resolve(); // Don't hard reject — graceful fallback to system fonts
      },
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
