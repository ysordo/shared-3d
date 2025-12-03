/* eslint-disable no-console */
// src/core/cache/generateManifest.ts
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
const TYPE_MAP = {
    '.glb': 'models',
    '.gltf': 'models',
    '.hdr': 'hdris',
    '.webp': 'hdris',
};
export async function generateManifest(objectDirs = 'public/models', outputPath) {
    const dirs = Array.isArray(objectDirs) ? objectDirs : [objectDirs];
    const manifest = { models: {}, hdris: {} };
    for (const dir of dirs) {
        const resolvedDir = path.resolve(dir);
        if (!fs.existsSync(resolvedDir)) {
            console.warn(`Carpeta no encontrada: ${resolvedDir}`);
            continue;
        }
        const files = fs.readdirSync(resolvedDir);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (!(ext in TYPE_MAP)) {
                continue;
            }
            const filePath = path.join(resolvedDir, file);
            const stat = fs.statSync(filePath);
            const buffer = fs.readFileSync(filePath);
            const hash = crypto.createHash('sha256').update(buffer).digest('hex');
            const id = path.basename(file, ext);
            const type = TYPE_MAP[ext];
            manifest[type][id] = {
                id,
                url: `/${path.relative('public', resolvedDir)}/${file}`.replace(/\\/g, '/'),
                hash,
                size: stat.size,
                updatedAt: stat.mtimeMs,
            };
        }
    }
    const finalOutput = outputPath || 'public/manifest.json';
    fs.mkdirSync(path.dirname(finalOutput), { recursive: true });
    fs.writeFileSync(finalOutput, JSON.stringify(manifest, null, 2));
    console.log('Manifest generado:');
    console.log(`  Models: ${Object.keys(manifest.models).length}`);
    console.log(`  HDRIs: ${Object.keys(manifest.hdris).length}`);
    console.log(`Guardado en: ${finalOutput}`);
    return manifest;
}
//# sourceMappingURL=generateManifest.js.map