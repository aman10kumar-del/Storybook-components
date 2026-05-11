#!/usr/bin/env node
/**
 * Resolve relative markdown links under docs/, prompts/, AGENTS.md, and .cursor/README.md.
 * Exits 1 if any target file or directory is missing.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const INLINE_LINK = /\[[^\]]*\]\(([^)]+)\)/g;

function extractUrl(inner) {
  let s = inner.trim();
  if (s.startsWith('<') && s.endsWith('>')) {
    s = s.slice(1, -1).trim();
  }
  const q = s.indexOf('"');
  if (q !== -1) {
    s = s.slice(0, q).trim();
  }
  const parts = s.split(/\s+/);
  return parts[0] || '';
}

function walkMarkdownFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['node_modules', 'dist', 'build-storybook', '.git'].includes(ent.name)) continue;
      out.push(...walkMarkdownFiles(full));
    } else if (ent.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

const entryPoints = [
  path.join(root, 'docs'),
  path.join(root, 'prompts'),
  path.join(root, 'AGENTS.md'),
  path.join(root, '.cursor', 'README.md'),
];

const allFiles = [];
for (const ep of entryPoints) {
  if (ep.endsWith('.md')) {
    if (fs.existsSync(ep)) allFiles.push(ep);
  } else {
    allFiles.push(...walkMarkdownFiles(ep));
  }
}

const errors = [];

for (const file of allFiles) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  INLINE_LINK.lastIndex = 0;
  while ((m = INLINE_LINK.exec(text)) !== null) {
    const url = extractUrl(m[1]);
    if (!url || url.startsWith('#')) continue;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url)) continue;

    const pathPart = url.split('#')[0];
    if (!pathPart) continue;

    const resolved = path.resolve(path.dirname(file), pathPart);
    const normalized = path.normalize(resolved);

    if (!normalized.startsWith(root)) {
      errors.push({ file, url, reason: 'resolves outside repo' });
      continue;
    }

    if (fs.existsSync(normalized)) continue;

    errors.push({ file, url, reason: 'missing' });
  }
}

if (errors.length) {
  console.error('Broken relative links:\n');
  for (const e of errors) {
    console.error(`  ${path.relative(root, e.file)} → ${e.url} (${e.reason})`);
  }
  process.exit(1);
}

console.log(`OK — checked links in ${allFiles.length} markdown file(s).`);
