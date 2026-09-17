import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const raw = JSON.parse(readFileSync(join(root, "_research/agentE/i18n.json"), "utf8"));

function toModule(locale, dict) {
  const body = JSON.stringify(dict, null, 2);
  if (locale === "en") {
    return `/** Auto-generated from live-site dictionary. Do not edit by hand. */\nexport const en = ${body} as const;\n\nexport type MessageKey = keyof typeof en;\n`;
  }
  return `/** Auto-generated from live-site dictionary. Do not edit by hand. */\nimport type { MessageKey } from "./en";\n\nexport const es: Record<MessageKey, string> = ${body};\n`;
}

const outDir = join(root, "content/i18n");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "en.ts"), toModule("en", raw.en));
writeFileSync(join(outDir, "es.ts"), toModule("es", raw.es));

const enKeys = Object.keys(raw.en);
const esKeys = new Set(Object.keys(raw.es));
const missing = enKeys.filter((k) => !esKeys.has(k));
const extra = Object.keys(raw.es).filter((k) => !(k in raw.en));

console.log(`en keys: ${enKeys.length}`);
console.log(`es keys: ${esKeys.size}`);
console.log(`missing in es: ${missing.length}${missing.length ? " -> " + missing.join(", ") : ""}`);
console.log(`extra in es: ${extra.length}${extra.length ? " -> " + extra.join(", ") : ""}`);
