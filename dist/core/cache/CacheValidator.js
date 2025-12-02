import { FileWatcher } from './FileWatcher';
import { ObjectCache } from './ObjectCache';
import { isDev } from './utils/env';
import { keys } from 'idb-keyval';
export class CacheValidator {
    static isFirstLoad = true;
    static async validate(options) {
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
        const cachedIds = new Set(cachedKeys
            .filter(k => typeof k === 'string' && k.startsWith('shared-3d:asset:'))
            .map(k => k.replace('shared-3d:asset:', '')));
        // Eliminar lo que ya no existe
        const removed = [];
        for (const id of cachedIds) {
            if (!currentIds.has(id)) {
                await ObjectCache.delete(id);
                removed.push(id);
            }
        }
        // Detectar qué hay que actualizar
        const toUpdate = [];
        for (const entry of manifest) {
            const cached = await ObjectCache.get(entry.id);
            if (!cached ||
                cached.hash !== entry.hash ||
                cached.updatedAt < entry.updatedAt) {
                toUpdate.push(entry);
            }
        }
        const report = {
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
//# sourceMappingURL=CacheValidator.js.map