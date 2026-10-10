// Pēc būvēšanas izdzēš no dist/_astro attēlus, uz kuriem neatsaucas neviens HTML/CSS/JS fails
// (Astro iekopē arī neizmantotus oriģinālus, piem. pilna izmēra .webp). Lapu tas nemaina.
import { readdir, readFile, stat, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGE = /\.(webp|png|jpe?g|avif|gif)$/i;
const TEXT = /\.(html|css|js|mjs|json|webmanifest|xml)$/i;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

export default function pruneUnusedImages() {
  return {
    name: 'prune-unused-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = await walk(root);
        const text = (await Promise.all(files.filter((f) => TEXT.test(f)).map((f) => readFile(f, 'utf8')))).join('\n');
        let removed = 0;
        let bytes = 0;
        for (const f of files) {
          if (!f.includes(`${join(root, '_astro')}`) || !IMAGE.test(f)) continue;
          const name = f.split(/[\\/]/).pop();
          if (!text.includes(name)) {
            bytes += (await stat(f)).size;
            await unlink(f);
            removed++;
          }
        }
        logger.info(`removed ${removed} unreferenced images (${(bytes / 1048576).toFixed(1)} MB)`);
      },
    },
  };
}
