import { get, set, keys, del } from 'idb-keyval';
// Constantes
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas
const CACHE_CLEANUP_THRESHOLD_MS = 30 * 24 * 60 * 60 * 1000; // 30 días
const CACHE_NAME = '3d-models';
const IDB_PREFIX = 'model:';
export class CacheManager {
    /**
     * Obtiene un modelo verificando si hay cambios en el servidor
     */
    static async getModel(url) {
        try {
            // Primero verificar si tenemos cache válido
            const cached = await this.getValidCachedModel(url);
            if (cached) {
                // Verificar cambios en el servidor (HEAD request liviano)
                const hasChanged = await this.checkForChanges(url, cached);
                if (!hasChanged) {
                    return cached.data;
                }
            }
            // Si no hay cache válido o hay cambios, cargar desde red
            return await this.fetchAndCacheModel(url);
        }
        catch (error) {
            console.error('Cache error:', error);
            return null;
        }
    }
    /**
     * Obtiene modelo válido del cache (menos de 24h)
     */
    static async getValidCachedModel(url) {
        const cached = await get(`${IDB_PREFIX}${url}`);
        return cached && !this.isOlderThan(cached.timestamp, CACHE_DURATION_MS) ? cached : null;
    }
    /**
     * Verifica cambios en el servidor usando ETag o Last-Modified
     */
    static async checkForChanges(url, cached) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (!response.ok) {
                return true;
            }
            const currentEtag = response.headers.get('ETag');
            const currentLastModified = response.headers.get('Last-Modified');
            // Si el ETag cambió, hay cambios
            if (currentEtag && cached.etag !== currentEtag) {
                return true;
            }
            // Si Last-Modified cambió, hay cambios
            if (currentLastModified && cached.lastModified !== currentLastModified) {
                return true;
            }
            // Si no hay headers de cache, asumimos cambios después de 1 hora
            if (!currentEtag && !currentLastModified) {
                return this.isOlderThan(cached.timestamp, 60 * 60 * 1000); // 1 hora
            }
            return false;
        }
        catch (error) {
            console.warn('Change check failed, assuming changes:', error);
            return true;
        }
    }
    /**
     * Descarga y cachea el modelo con metadatos de validación
     */
    static async fetchAndCacheModel(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch model: ${response.status}`);
        }
        const data = await response.arrayBuffer();
        const etag = response.headers.get('ETag') || undefined;
        const lastModified = response.headers.get('Last-Modified') || undefined;
        await this.saveModelInternal(url, data, etag, lastModified);
        return data;
    }
    /**
     * Guarda modelo con metadatos de validación
     */
    static async saveModel(url, data) {
        // Obtener headers de validación si es posible
        let etag;
        let lastModified;
        try {
            const headResponse = await fetch(url, { method: 'HEAD' });
            if (headResponse.ok) {
                etag = headResponse.headers.get('ETag') || undefined;
                lastModified = headResponse.headers.get('Last-Modified') || undefined;
            }
        }
        catch (error) {
            console.warn('Cannot get validation headers:', error);
        }
        await this.saveModelInternal(url, data, etag, lastModified);
    }
    static async saveModelInternal(url, data, etag, lastModified) {
        const cacheData = {
            data,
            timestamp: Date.now(),
            etag,
            lastModified
        };
        try {
            await Promise.all([
                // IndexedDB
                set(`${IDB_PREFIX}${url}`, cacheData),
                // Cache Storage
                (async () => {
                    try {
                        const cache = await caches.open(CACHE_NAME);
                        await cache.put(url, new Response(data));
                    }
                    catch (error) {
                        console.warn('Cache Storage save failed:', error);
                    }
                })()
            ]);
        }
        catch (error) {
            console.error('Cache save error:', error);
        }
    }
    /**
     * Fuerza la verificación de cambios y actualización del cache
     */
    static async validateAndUpdateCache(url) {
        try {
            const cached = await get(`${IDB_PREFIX}${url}`);
            if (!cached) {
                return false;
            }
            const hasChanged = await this.checkForChanges(url, cached);
            if (hasChanged) {
                await this.fetchAndCacheModel(url);
                return true; // Se actualizó
            }
            return false; // No había cambios
        }
        catch (error) {
            console.error('Cache validation error:', error);
            return false;
        }
    }
    /**
     * Programa verificación automática periódica de cambios
     */
    static startAutoValidation(checkIntervalMs = 60 * 60 * 1000) {
        setInterval(async () => {
            try {
                const modelKeys = await this.getModelKeys();
                for (const key of modelKeys) {
                    const url = key.replace(IDB_PREFIX, '');
                    await this.validateAndUpdateCache(url);
                }
            }
            catch (error) {
                console.error('Auto validation error:', error);
            }
        }, checkIntervalMs);
    }
    // Métodos auxiliares (mantener del código anterior)
    static async getModelKeys() {
        const allKeys = await keys();
        return allKeys.filter(key => typeof key === 'string' && key.startsWith(IDB_PREFIX));
    }
    static isOlderThan(timestamp, maxAgeMs) {
        return Date.now() - timestamp > maxAgeMs;
    }
    static async clearExpiredModels() {
        try {
            const modelKeys = await this.getModelKeys();
            await Promise.all(modelKeys.map(async (key) => {
                const cached = await get(key);
                if (cached && this.isOlderThan(cached.timestamp, CACHE_CLEANUP_THRESHOLD_MS)) {
                    await del(key);
                }
            }));
        }
        catch (error) {
            console.error('Cache cleanup error:', error);
        }
    }
    static async clearAllModels() {
        try {
            const modelKeys = await this.getModelKeys();
            await Promise.all([
                ...modelKeys.map(key => del(key)),
                caches.delete(CACHE_NAME)
            ]);
        }
        catch (error) {
            console.error('Clear all models error:', error);
        }
    }
    static async getCacheStats() {
        try {
            const modelKeys = await this.getModelKeys();
            let totalSize = 0;
            for (const key of modelKeys) {
                const cached = await get(key);
                if (cached?.data) {
                    totalSize += cached.data.byteLength;
                }
            }
            return { count: modelKeys.length, totalSize };
        }
        catch (error) {
            console.error('Cache stats error:', error);
            return { count: 0, totalSize: 0 };
        }
    }
}
//# sourceMappingURL=CacheManager.js.map