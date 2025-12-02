"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/cache/server/index.server.ts
var index_server_exports = {};
__export(index_server_exports, {
  generateManifest: () => generateManifest
});
module.exports = __toCommonJS(index_server_exports);

// src/core/cache/server/generateManifest.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_crypto = __toESM(require("crypto"), 1);
async function generateManifest(modelsDir = "public/models", outputPath) {
  const resolvedDir = import_path.default.resolve(modelsDir);
  if (!import_fs.default.existsSync(resolvedDir)) {
    throw new Error(`Carpeta no encontrada: ${resolvedDir}`);
  }
  const entries = [];
  const files = import_fs.default.readdirSync(resolvedDir);
  for (const file of files) {
    const ext = import_path.default.extname(file).toLowerCase();
    if (![".glb", ".gltf", ".hdr", ".webp"].includes(ext)) {
      continue;
    }
    const filePath = import_path.default.join(resolvedDir, file);
    const stat = import_fs.default.statSync(filePath);
    const buffer = import_fs.default.readFileSync(filePath);
    const hash = import_crypto.default.createHash("sha256").update(buffer).digest("hex");
    const id = import_path.default.basename(file, ext);
    entries.push({
      id,
      url: `/models/${file}`,
      hash,
      size: stat.size,
      updatedAt: stat.mtimeMs
    });
  }
  entries.sort((a, b) => a.id.localeCompare(b.id));
  const finalOutput = outputPath || import_path.default.join(resolvedDir, "manifest.json");
  import_fs.default.mkdirSync(import_path.default.dirname(finalOutput), { recursive: true });
  import_fs.default.writeFileSync(finalOutput, JSON.stringify(entries, null, 2));
  console.log(`Manifest generado: ${entries.length} archivos`);
  console.log(`Guardado en: ${finalOutput}`);
  return entries;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateManifest
});
