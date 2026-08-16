#!/usr/bin/env node
/**
 * OpenCut Chain Reaction - one-shot verification pipeline.
 *
 * Runs, in order:
 *   1. TypeScript typecheck (tsc --noEmit)
 *   2. Unit tests (vitest run)
 *   3. Production build (vite build)
 *
 * Usage:
 *   node tools/chain-reaction.mjs            # full pipeline
 *   node tools/chain-reaction.mjs --skip-build
 *   node tools/chain-reaction.mjs --skip-typecheck
 *
 * Exits 0 only when every enabled stage passes.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const web = path.join(root, "apps", "web");
const bin = path.join(web, "node_modules", ".bin");

const skipTypecheck = process.argv.includes("--skip-typecheck");
const skipTests = process.argv.includes("--skip-tests");
const skipBuild = process.argv.includes("--skip-build");

const CYAN = "\x1b[36m", GREEN = "\x1b[32m", YELLOW = "\x1b[33m", RED = "\x1b[31m", MAGENTA = "\x1b[35m", BOLD = "\x1b[1m", DIM = "\x1b[2m", RESET = "\x1b[0m";

const results = [];

function log(level, msg) {
  const tag = { info: `${CYAN}[i]${RESET}`, ok: `${GREEN}[✓]${RESET}`, warn: `${YELLOW}[!]${RESET}`, err: `${RED}[✗]${RESET}`, step: `${MAGENTA}[>]${RESET}` }[level] ?? CYAN + "[i]" + RESET;
  console.log(`${tag} ${msg}`);
}

function run(label, args) {
  log("step", `${BOLD}${label}${RESET}`);
  const start = Date.now();
  const res = spawnSync("cmd.exe", ["/c", ...args], { cwd: web, stdio: "inherit", shell: false });
  const secs = ((Date.now() - start) / 1000).toFixed(1);
  const ok = res.status === 0;
  results.push({ label, ok, secs });
  log(ok ? "ok" : "err", `${label} ${ok ? "passed" : "FAILED"} in ${secs}s`);
  return ok;
}

console.log("");
console.log(`${CYAN}===============================================================${RESET}`);
console.log(`${BOLD}${CYAN}   OPENCUT CHAIN REACTION - typecheck · tests · build${RESET}`);
console.log(`${CYAN}===============================================================${RESET}`);
console.log(`${DIM}  node ${process.version} · ${path.basename(root)}${RESET}\n`);

const all = [];

if (!skipTypecheck) all.push({ label: "TypeScript typecheck", args: [path.join(bin, "tsc.exe"), "--noEmit"] });
if (!skipTests) all.push({ label: "Unit tests (vitest)", args: [path.join(bin, "vitest.exe"), "run"] });
if (!skipBuild) all.push({ label: "Production build (vite)", args: [path.join(bin, "vite.exe"), "build"] });

all.forEach((s) => run(s.label, s.args));
const failed = results.filter((o) => !o.ok);
const total = results.reduce((sum, o) => sum + parseFloat(o.secs), 0);

console.log("");
console.log(`${CYAN}---------------------------------------------------------------${RESET}`);
for (const r of results) {
  console.log(`  ${r.ok ? GREEN + "✓" : RED + "✗" + RESET}  ${r.label.padEnd(30)} ${DIM}${r.secs}s${RESET}`);
}
console.log(`${CYAN}---------------------------------------------------------------${RESET}`);
if (failed.length === 0) {
  console.log(`  ${GREEN}${BOLD}ALL STAGES GREEN${RESET}  ${DIM}${total.toFixed(1)}s total${RESET}`);
  console.log(`${CYAN}===============================================================${RESET}`);
  process.exit(0);
} else {
  console.log(`  ${RED}${BOLD}${failed.length} STAGE(S) FAILED${RESET}  ${DIM}${total.toFixed(1)}s total${RESET}`);
  for (const f of failed) console.log(`  ${RED}    - ${f.label}${RESET}`);
  console.log(`${CYAN}===============================================================${RESET}`);
  process.exit(1);
}
