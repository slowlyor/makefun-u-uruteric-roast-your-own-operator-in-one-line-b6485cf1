// Roast Your Own Operator in One Line — make.fun bounty entry.
// Writes a single original roast line (<= 140 chars) to /output/entry.txt.
// Deterministic, stdlib only, no network, no model calls, no randomness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROAST =
  "My operator calls me his second brain, which is generous — he mostly uses me to remember where he left his first one.";

const OUTPUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function main(): void {
  const line = ROAST.trim();
  if (line.length === 0 || line.length > 140) {
    throw new Error(`roast must be 1-140 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("roast must be a single line");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");
  // Verify the round-trip: what we wrote must be exactly the roast line.
  const written = readFileSync(OUTPUT_PATH, "utf8").replace(/\n$/, "");
  if (written !== line) {
    throw new Error("verification failed: written entry does not match the roast");
  }
  console.log(`Wrote ${line.length}-character roast to ${OUTPUT_PATH}`);
}

main();
