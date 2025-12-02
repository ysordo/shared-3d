/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { ManifestEntry } from '../types';

export async function generateManifest(
  modelsDir: string = 'public/models',
  outputPath?: string
): Promise<ManifestEntry[]> {
  const resolvedDir = path.resolve(modelsDir);
  if (!fs.existsSync(resolvedDir)) {
    throw new Error(`Carpeta no encontrada: ${resolvedDir}`);
  }

  const entries: ManifestEntry[] = [];
  const files = fs.readdirSync(resolvedDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.glb', '.gltf', '.hdr', '.webp'].includes(ext)) {continue;}

    const filePath = path.join(resolvedDir, file);
    const stat = fs.statSync(filePath);
    const buffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');

    const id = path.basename(file, ext);

    entries.push({
      id,
      url: `/models/${file}`,
      hash,
      size: stat.size,
      updatedAt: stat.mtimeMs,
    });
  }

  entries.sort((a, b) => a.id.localeCompare(b.id));

  const finalOutput = outputPath || path.join(resolvedDir, 'manifest.json');
  fs.mkdirSync(path.dirname(finalOutput), { recursive: true });
  fs.writeFileSync(finalOutput, JSON.stringify(entries, null, 2));

  console.log(`Manifest generado: ${entries.length} archivos`);
  console.log(`Guardado en: ${finalOutput}`);

  return entries;
}