import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
// Public origin used for canonical URL, Open Graph, robots.txt and sitemap.xml.
const siteUrl = (process.env.SITE_URL || "https://lobaergrun.ch").replace(/\/+$/, "");
const renderPage = async (name) =>
  (await readFile(resolve(root, "static", name), "utf8")).replaceAll("__SITE_URL__", siteUrl);
const html = await renderPage("index.html");
const datenschutz = await renderPage("datenschutz.html");
const notFound = await renderPage("404.html");
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc></url>
</urlset>
`;
const hosting = await readFile(resolve(root, ".openai/hosting.json"), "utf8");
const serverEntry = resolve(root, "dist/server/index.js");
const hostingJson = resolve(root, "dist/.openai/hosting.json");
const staticOut = resolve(root, "dist/static");

const contentTypes = {
  ".gif": "image/gif",
  ".html": "text/html;charset=utf-8",
  ".pdf": "application/pdf",
  ".txt": "text/plain;charset=utf-8",
  ".xml": "application/xml",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

const sponsorAssets = {};
const embed = (path, bytes) => {
  sponsorAssets[path] = {
    body: Buffer.from(bytes).toString("base64"),
    contentType: contentTypes[extname(path).toLowerCase()] ?? "application/octet-stream",
  };
};
for (const file of await readdir(resolve(root, "public/sponsor-assets"))) {
  embed(`/sponsor-assets/${file}`, await readFile(resolve(root, "public/sponsor-assets", file)));
}
// Only embed the assets the static page actually references.
const referenced = new Set(html.match(/\/lobaerg-assets\/[\w.-]+/g));
for (const path of [...referenced, "/favicon.png", "/apple-touch-icon.png", "/og-image.jpg"]) {
  embed(path, await readFile(resolve(root, `public${path}`)));
}
embed("/datenschutz.html", datenschutz);
embed("/robots.txt", robots);
embed("/sitemap.xml", sitemap);

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

// Copy static files for Cloudflare Pages / Vercel deployment
await mkdir(staticOut, { recursive: true });
await cp(resolve(root, "public"), staticOut, { recursive: true });
await writeFile(resolve(staticOut, "index.html"), html);
await writeFile(resolve(staticOut, "datenschutz.html"), datenschutz);
await writeFile(resolve(staticOut, "404.html"), notFound);
await writeFile(resolve(staticOut, "robots.txt"), robots);
await writeFile(resolve(staticOut, "sitemap.xml"), sitemap);
// Cloudflare Pages: keep preview hostnames out of search results.
await writeFile(
  resolve(staticOut, "_headers"),
  `https://:project.pages.dev/*\n  X-Robots-Tag: noindex\nhttps://:version.:project.pages.dev/*\n  X-Robots-Tag: noindex\n`,
);

console.log("Built static Worker artifact in dist/");
