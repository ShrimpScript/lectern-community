// Regenerate index.json from skills/*.json. Run by CI on every change to skills/
// so contributors only ever add a skills/<id>.json file — the browse index keeps
// itself in sync. Safe to run locally: `node scripts/build-index.mjs`.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const GUI_HINT = /\b(xdotool|wmctrl|xte|scrot|xdg-open)\b|^\s*\[\+[\d.]+s?\]/;

function kindOf(bundle) {
  if (bundle.kind === "gui" || bundle.kind === "instruction") return bundle.kind;
  const steps = Array.isArray(bundle.steps) ? bundle.steps : [];
  const guiish = steps.filter((s) => GUI_HINT.test(String(s))).length;
  return steps.length > 0 && guiish >= Math.ceil(steps.length / 2) ? "gui" : "instruction";
}

const files = readdirSync("skills").filter((f) => f.endsWith(".json")).sort();
const skills = [];
for (const f of files) {
  const id = f.replace(/\.json$/, "");
  const b = JSON.parse(readFileSync(`skills/${f}`, "utf8"));
  if (!b.name || typeof b.name !== "string") throw new Error(`skills/${f}: missing "name"`);
  skills.push({
    id,
    name: b.name,
    description: b.description ?? "",
    triggers: Array.isArray(b.triggers) ? b.triggers : [],
    author: b.author ?? null,
    version: Number.isInteger(b.version) ? b.version : 1,
    kind: kindOf(b),
  });
}
skills.sort((a, b) => a.name.localeCompare(b.name));

const out = JSON.stringify({ version: 1, skills }, null, 2) + "\n";
writeFileSync("index.json", out);
console.log(`index.json: ${skills.length} skill(s)`);
