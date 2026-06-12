import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const html = await readFile(resolve(root, "static/index.html"), "utf8");
const hosting = await readFile(resolve(root, ".openai/hosting.json"), "utf8");
const sponsorAssetDir = resolve(root, "public/sponsor-assets");
const serverEntry = resolve(root, "dist/server/index.js");
const hostingJson = resolve(root, "dist/.openai/hosting.json");
const staticOut = resolve(root, "dist/static");

const contentTypes = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

const sponsorAssets = {};
for (const file of await readdir(sponsorAssetDir)) {
  const bytes = await readFile(resolve(sponsorAssetDir, file));
  sponsorAssets[`/sponsor-assets/${file}`] = {
    body: bytes.toString("base64"),
    contentType: contentTypes[extname(file).toLowerCase()] ?? "application/octet-stream",
  };
}

await rm(resolve(root, "dist"), { force: true, recursive: true });
await mkdir(dirname(serverEntry), { recursive: true });
await mkdir(dirname(hostingJson), { recursive: true });

await writeFile(
  serverEntry,
  `const html = ${JSON.stringify(html)};\nconst sponsorAssets = ${JSON.stringify(sponsorAssets)};\n\nfunction decodeBase64(value) {\n  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));\n}\n\nexport default {\n  async fetch(request) {\n    const url = new URL(request.url);\n    if (url.pathname === \"/health\") {\n      return new Response(\"ok\", { headers: { \"content-type\": \"text/plain;charset=utf-8\" } });\n    }\n\n    const asset = sponsorAssets[url.pathname];\n    if (asset) {\n      return new Response(decodeBase64(asset.body), {\n        headers: {\n          \"content-type\": asset.contentType,\n          \"cache-control\": \"public, max-age=31536000, immutable\",\n        },\n      });\n    }\n\n    return new Response(html, {\n      headers: {\n        \"content-type\": \"text/html;charset=utf-8\",\n        \"cache-control\": \"public, max-age=300\",\n      },\n    });\n  },\n};\n`,
);

await writeFile(
  hostingJson,
  hosting,
);

// Copy static files for Vercel deployment
await mkdir(staticOut, { recursive: true });
await writeFile(resolve(staticOut, "index.html"), html);
await cp(resolve(root, "public"), staticOut, { recursive: true });

console.log("Built static Worker artifact in dist/");
