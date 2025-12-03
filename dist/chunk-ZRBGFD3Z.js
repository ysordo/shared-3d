import {
  FileWatcher
} from "./chunk-777TCJKN.js";
import {
  isDev
} from "./chunk-SRUKCELR.js";
import {
  ObjectCache
} from "./chunk-MAROSTDG.js";

// src/core/cache/CacheValidator.ts
import { keys } from "idb-keyval";
var CacheValidator = class _CacheValidator {
  static isFirstLoad = true;
  static async validate(options) {
    const { manifest, onProgress, onComplete, forceUpdate = false } = options;
    onProgress?.(0, "Iniciando validaci\xF3n de cach\xE9...");
    if (isDev() && !forceUpdate) {
      const watcher = FileWatcher.getInstance();
      watcher.watch(manifest, (changedIds) => {
        onProgress?.(100, `Recargando: ${changedIds.join(", ")}`);
        onComplete?.({
          validated: true,
          updated: changedIds,
          removed: [],
          added: [],
          errors: [],
          durationMs: 0
        });
      });
      onProgress?.(100, "Modo desarrollo: observando cambios...");
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }
    if (!_CacheValidator.isFirstLoad && !forceUpdate) {
      onProgress?.(100, "Cach\xE9 ya validada");
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }
    onProgress?.(10, "Comparando manifest con cach\xE9 local...");
    const start = performance.now();
    const currentIds = new Set(manifest.map((m) => m.id));
    const cachedKeys = await keys();
    const cachedIds = new Set(
      cachedKeys.filter((k) => typeof k === "string" && k.startsWith("shared-3d:asset:")).map((k) => k.replace("shared-3d:asset:", ""))
    );
    const removed = [];
    for (const id of cachedIds) {
      if (!currentIds.has(id)) {
        await ObjectCache.delete(id);
        removed.push(id);
      }
    }
    const toUpdate = [];
    for (const entry of manifest) {
      const cached = await ObjectCache.get(entry.id);
      if (!cached || cached.hash !== entry.hash || cached.updatedAt < entry.updatedAt) {
        toUpdate.push(entry);
      }
    }
    const report = {
      validated: true,
      updated: toUpdate.map((e) => e.id),
      removed,
      added: toUpdate.filter((e) => !cachedIds.has(e.id)).map((e) => e.id),
      errors: [],
      durationMs: Math.round(performance.now() - start)
    };
    _CacheValidator.isFirstLoad = false;
    onProgress?.(100, "Validaci\xF3n completa");
    onComplete?.(report);
    return report;
  }
  static reset() {
    _CacheValidator.isFirstLoad = true;
  }
};

export {
  CacheValidator
};
