// Scans site source for characters banned by docs/rules.md:
// em dashes, en dashes, text arrows and emojis.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components", "data", "lib"];
const EXTENSIONS = /\.(tsx?|jsx?|mjs|css|md|json)$/;
const ALLOWED_SYMBOLS = new Set(["©", "®", "™"]);

const checks = [
  { name: "em dash", pattern: /—/g },
  { name: "en dash", pattern: /–/g },
  { name: "text arrow", pattern: /-->|->|<-(?!-)|→|←|»|«/g },
  { name: "emoji", pattern: /\p{Extended_Pictographic}/gu },
];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : EXTENSIONS.test(path) ? [path] : [];
  });
}

const problems = [];

for (const root of ROOTS) {
  let files = [];
  try {
    files = walk(root);
  } catch {
    continue;
  }
  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const { name, pattern } of checks) {
        for (const match of line.matchAll(pattern)) {
          if (name === "emoji" && ALLOWED_SYMBOLS.has(match[0])) continue;
          problems.push(`${relative(".", file)}:${index + 1}  ${name}  "${match[0]}"`);
        }
      }
    });
  }
}

if (problems.length) {
  console.error(`Banned characters found (${problems.length}):\n`);
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log("Copy check passed: no em dashes, en dashes, text arrows or emojis.");
