"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/core/cache/server/generateManifest.ts
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var TYPE_MAP = {
  ".glb": "models",
  ".gltf": "models",
  ".hdr": "hdris",
  ".webp": "hdris"
};
async function generateManifest(objectDirs = "public/models", outputPath) {
  const dirs = Array.isArray(objectDirs) ? objectDirs : [objectDirs];
  const manifest = { models: {}, hdris: {} };
  for (const dir of dirs) {
    const resolvedDir = _path2.default.resolve(dir);
    if (!_fs2.default.existsSync(resolvedDir)) {
      console.info(`Carpeta no encontrada: ${resolvedDir}`);
      continue;
    }
    const files = _fs2.default.readdirSync(resolvedDir);
    for (const file of files) {
      const ext = _path2.default.extname(file).toLowerCase();
      if (!(ext in TYPE_MAP)) {
        continue;
      }
      const filePath = _path2.default.join(resolvedDir, file);
      const stat = _fs2.default.statSync(filePath);
      const buffer = _fs2.default.readFileSync(filePath);
      const hash = _crypto2.default.createHash("sha256").update(buffer).digest("hex");
      const id = _path2.default.basename(file, ext);
      const type = TYPE_MAP[ext];
      manifest[type][id] = {
        id,
        url: `/${_path2.default.relative("public", resolvedDir)}/${file}`.replace(/\\/g, "/"),
        hash,
        size: stat.size,
        updatedAt: stat.mtimeMs
      };
    }
  }
  const finalOutput = outputPath || "public/manifest.json";
  _fs2.default.mkdirSync(_path2.default.dirname(finalOutput), { recursive: true });
  _fs2.default.writeFileSync(finalOutput, JSON.stringify(manifest, null, 2));
  console.info("Manifest generado:");
  console.info(`  Models: ${Object.keys(manifest.models).length}`);
  console.info(`  HDRIs: ${Object.keys(manifest.hdris).length}`);
  console.info(`Guardado en: ${finalOutput}`);
  return manifest;
}



exports.generateManifest = generateManifest;
