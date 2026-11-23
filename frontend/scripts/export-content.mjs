// Snapshot Strapi content + media into the repo for static export.
// Usage: STRAPI_URL=http://localhost:1337 node scripts/export-content.mjs
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STRAPI_URL = (process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const mediaDir = path.join(root, 'public', 'content', 'media');

const endpoints = {
  about: '/about?populate=*',
  projects: '/projects?populate=*&sort=order:asc',
  experiences: '/experiences?populate=*&sort=startDate:desc',
  tools: '/tools?populate=*&sort=order:asc',
};

const downloaded = new Map(); // original /uploads path -> local public path

async function fetchMedia(uploadPath) {
  if (downloaded.has(uploadPath)) return downloaded.get(uploadPath);
  const name = path.basename(uploadPath.split('?')[0]);
  const res = await fetch(`${STRAPI_URL}${uploadPath}`);
  if (!res.ok) throw new Error(`Media ${uploadPath}: ${res.status}`);
  await writeFile(path.join(mediaDir, name), Buffer.from(await res.arrayBuffer()));
  const local = `/content/media/${name}`;
  downloaded.set(uploadPath, local);
  return local;
}

async function rewrite(node) {
  if (typeof node === 'string') {
    return node.startsWith('/uploads/') ? fetchMedia(node) : node;
  }
  if (Array.isArray(node)) return Promise.all(node.map(rewrite));
  if (node && typeof node === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = await rewrite(v);
    return out;
  }
  return node;
}

await rm(mediaDir, { recursive: true, force: true });
await mkdir(mediaDir, { recursive: true });
await mkdir(contentDir, { recursive: true });

for (const [name, endpoint] of Object.entries(endpoints)) {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`);
  if (!res.ok) throw new Error(`${endpoint}: ${res.status} (check public role permissions)`);
  const { data } = await res.json();
  await writeFile(path.join(contentDir, `${name}.json`), JSON.stringify(await rewrite(data), null, 2));
  console.log(`✔ ${name}`);
}
console.log(`Done. ${downloaded.size} media files saved.`);
