import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const html = await readFile(resolve(root, "static/index.html"), "utf8");
const hosting = await readFile(resolve(root, ".openai/hosting.json"), "utf8");
const serverEntry = resolve(root, "dist/server/index.js");
const hostingJson = resolve(root, "dist/.openai/hosting.json");

await rm(resolve(root, "dist"), { force: true, recursive: true });
await mkdir(dirname(serverEntry), { recursive: true });
await mkdir(dirname(hostingJson), { recursive: true });

await writeFile(
  serverEntry,
  `const html = ${JSON.stringify(html)};\n\nexport default {\n  async fetch(request) {\n    const url = new URL(request.url);\n    if (url.pathname === \"/health\") {\n      return new Response(\"ok\", { headers: { \"content-type\": \"text/plain;charset=utf-8\" } });\n    }\n\n    return new Response(html, {\n      headers: {\n        \"content-type\": \"text/html;charset=utf-8\",\n        \"cache-control\": \"public, max-age=300\",\n      },\n    });\n  },\n};\n`,
);

await writeFile(
  hostingJson,
  hosting,
);

console.log("Built static Worker artifact in dist/");
