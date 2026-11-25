// The Meeting That Should Have Been an Email — make.fun bounty entry.
// Writes a single one-line joke to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, stdlib only. Deterministic: same input, same output, every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Someone shared their screen to show us an email we could have just read.";

// The bounty gate: the entry must be one line of 1-200 characters.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be exactly one line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// No trailing newline: the file is exactly the line, nothing else.
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
