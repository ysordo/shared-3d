import { FileWatcher } from './FileWatcher';
import { ObjectCache } from './ObjectCache';
import { isDev } from './utils/env';
import type { ModelManifestEntry, CacheReport } from './types';
import { keys } from 'idb-keyval';

export type ValidationOptions = {
  manifest: ModelManifestEntry[];
  onProgress?: (progress: number, status: string) => void;
  onComplete?: (report: CacheReport) => void;
  forceUpdate?: boolean;
};

export class CacheValidator {
  private static isFirstLoad = true;

  static async validate(options: ValidationOptions): Promise<CacheReport> {
    const { manifest, onProgress, onComplete, forceUpdate = false } = options;

    onProgress?.(0, 'Iniciando validación de caché...');

    if (isDev() && !forceUpdate) {
      const watcher = FileWatcher.getInstance();
      watcher.watch(manifest, (changedIds) => {
        onProgress?.(100, `Recargando: ${changedIds.join(', ')}`);
        onComplete?.({
          validated: true,
          updated: changedIds,
          removed: [],
          added: [],
          errors: [],
          durationMs: 0,
        });
      });
      onProgress?.(100, 'Modo desarrollo: observando cambios...');
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }

    if (!CacheValidator.isFirstLoad && !forceUpdate) {
      onProgress?.(100, 'Caché ya validada');
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }

    onProgress?.(10, 'Comparando manifest con caché local...');

    const start = performance.now();

    const currentIds = new Set(manifest.map(m => m.id));
    const cachedKeys = await keys();
    const cachedIds = new Set(
      cachedKeys
        .filter(k => typeof k === 'string' && k.startsWith('shared-3d:asset:'))
        .map(k => (k as string).replace('shared-3d:asset:', ''))
    );

    // Eliminar lo que ya no existe
    const removed: string[] = [];
    for (const id of cachedIds) {
      if (!currentIds.has(id)) {
        await ObjectCache.delete(id);
        removed.push(id);
      }
    }

    const toUpdate: ModelManifestEntry[] = [];
    for (const entry of manifest) {
      const cached = await ObjectCache.get(entry.id);
      if (!cached || cached.hash !== entry.hash) {
        toUpdate.push(entry);
      }
    }

    const report: CacheReport = {
      validated: true,
      updated: toUpdate.map(e => e.id),
      removed,
      added: toUpdate.filter(e => !cachedIds.has(e.id)).map(e => e.id),
      errors: [],
      durationMs: Math.round(performance.now() - start),
    };

    CacheValidator.isFirstLoad = false;
    onProgress?.(100, 'Validación completa');
    onComplete?.(report);

    return report;
  }

  static reset() {
    CacheValidator.isFirstLoad = true;
  }
}