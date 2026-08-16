#!/usr/bin/env node
/**
 * Sync the planning documents with the current app strategy.
 *
 * Purpose:
 * - ensure the core markdown docs remain linked
 * - provide a single script to inspect/reinforce the strategy and reuse-first posture
 * - reduce manual drift between docs and implementation
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "MASTER_PLAN.md",
  "PROJECT_STATE.md",
  "GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md",
  "INTEGRATIONS.md",
  "DEV_TIME_SAVINGS_REPORT.md",
  "OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md",
];

const requiredLinks = {
  "MASTER_PLAN.md": [
    "PROJECT_STATE.md",
    "GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md",
    "INTEGRATIONS.md",
    "DEV_TIME_SAVINGS_REPORT.md",
    "OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md",
  ],
  "PROJECT_STATE.md": [
    "MASTER_PLAN.md",
    "GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md",
    "INTEGRATIONS.md",
    "DEV_TIME_SAVINGS_REPORT.md",
    "OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md",
  ],
  "GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md": [
    "MASTER_PLAN.md",
    "PROJECT_STATE.md",
    "INTEGRATIONS.md",
    "DEV_TIME_SAVINGS_REPORT.md",
    "OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md",
  ],
  "INTEGRATIONS.md": [
    "MASTER_PLAN.md",
    "PROJECT_STATE.md",
    "GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md",
    "DEV_TIME_SAVINGS_REPORT.md",
    "OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md",
  ],
  "DEV_TIME_SAVINGS_REPORT.md": [
    "MASTER_PLAN.md",
    "PROJECT_STATE.md",
    "GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md",
    "INTEGRATIONS.md",
    "OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md",
  ],
  "OPEN_SOURCE_REUSE_AND_OPTIMIZATION.md": [
    "MASTER_PLAN.md",
    "PROJECT_STATE.md",
    "GITHUB_AND_OPEN_SOFTWARE_INTEGRATIONS.md",
    "INTEGRATIONS.md",
    "DEV_TIME_SAVINGS_REPORT.md",
  ],
};

let failed = 0;

for (const file of files) {
  const target = path.join(root, file);
  const text = fs.readFileSync(target, "utf8");
  const missing = requiredLinks[file].filter((link) => !text.includes(`[${link}](${link})`));

  if (missing.length > 0) {
    failed += 1;
    console.log(`Missing links in ${file}: ${missing.join(", ")}`);
  } else {
    console.log(`OK: ${file}`);
  }
}

if (failed > 0) {
  console.log(`\n${failed} doc(s) require link cleanup.`);
  process.exit(1);
}

console.log("\nAll markdown strategy docs are cross-linked and synced to the reuse-first plan.");
