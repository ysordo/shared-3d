import { get, set, keys, del } from 'idb-keyval';

// Constantes
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas
const CACHE_CLEANUP_THRESHOLD_MS = 30 * 24 * 60 * 60 * 1000; // 30 días
const CACHE_NAME = '3d-models';
const IDB_PREFIX = 'model:';

interface CachedModel {
    data: ArrayBuffer;
    timestamp: number;
    etag?: string;
    lastModified?: string;
}

export class CacheManager {
    /**
     * Obtiene un modelo verificando si hay cambios en el servidor
     */
    static async getModel(url: string): Promise<ArrayBuffer | null> {
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
        } catch (error) {
            console.error('Cache error:', error);
            return null;
        }
    }

    /**
     * Obtiene modelo válido del cache (menos de 24h)
     */
    private static async getValidCachedModel(url: string): Promise<CachedModel | null> {
        const cached = await get<CachedModel>(`${IDB_PREFIX}${url}`);
        return cached && !this.isOlderThan(cached.timestamp, CACHE_DURATION_MS) ? cached : null;
    }

    /**
     * Verifica cambios en el servidor usando ETag o Last-Modified
     */
    private static async checkForChanges(url: string, cached: CachedModel): Promise<boolean> {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            
            if (!response.ok) {return true;}

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
        } catch (error) {
            console.warn('Change check failed, assuming changes:', error);
            return true;
        }
    }

    /**
     * Descarga y cachea el modelo con metadatos de validación
     */
    private static async fetchAndCacheModel(url: string): Promise<ArrayBuffer> {
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
    static async saveModel(url: string, data: ArrayBuffer): Promise<void> {
        // Obtener headers de validación si es posible
        let etag: string | undefined;
        let lastModified: string | undefined;

        try {
            const headResponse = await fetch(url, { method: 'HEAD' });
            if (headResponse.ok) {
                etag = headResponse.headers.get('ETag') || undefined;
                lastModified = headResponse.headers.get('Last-Modified') || undefined;
            }
        } catch (error) {
            console.warn('Cannot get validation headers:', error);
        }

        await this.saveModelInternal(url, data, etag, lastModified);
    }

    private static async saveModelInternal(
        url: string, 
        data: ArrayBuffer, 
        etag?: string, 
        lastModified?: string
    ): Promise<void> {
        const cacheData: CachedModel = {
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
                    } catch (error) {
                        console.warn('Cache Storage save failed:', error);
                    }
                })()
            ]);
        } catch (error) {
            console.error('Cache save error:', error);
        }
    }

    /**
     * Fuerza la verificación de cambios y actualización del cache
     */
    static async validateAndUpdateCache(url: string): Promise<boolean> {
        try {
            const cached = await get<CachedModel>(`${IDB_PREFIX}${url}`);
            if (!cached) {return false;}

            const hasChanged = await this.checkForChanges(url, cached);
            if (hasChanged) {
                await this.fetchAndCacheModel(url);
                return true; // Se actualizó
            }
            return false; // No había cambios
        } catch (error) {
            console.error('Cache validation error:', error);
            return false;
        }
    }

    /**
     * Programa verificación automática periódica de cambios
     */
    static startAutoValidation(checkIntervalMs: number = 60 * 60 * 1000): void {
        setInterval(async () => {
            try {
                const modelKeys = await this.getModelKeys();
                for (const key of modelKeys) {
                    const url = key.replace(IDB_PREFIX, '');
                    await this.validateAndUpdateCache(url);
                }
            } catch (error) {
                console.error('Auto validation error:', error);
            }
        }, checkIntervalMs);
    }

    // Métodos auxiliares (mantener del código anterior)
    private static async getModelKeys(): Promise<string[]> {
        const allKeys = await keys();
        return allKeys.filter(key => 
            typeof key === 'string' && key.startsWith(IDB_PREFIX)
        ) as string[];
    }

    private static isOlderThan(timestamp: number, maxAgeMs: number): boolean {
        return Date.now() - timestamp > maxAgeMs;
    }

    static async clearExpiredModels(): Promise<void> {
        try {
            const modelKeys = await this.getModelKeys();
            
            await Promise.all(
                modelKeys.map(async (key) => {
                    const cached = await get<CachedModel>(key);
                    if (cached && this.isOlderThan(cached.timestamp, CACHE_CLEANUP_THRESHOLD_MS)) {
                        await del(key);
                    }
                })
            );
        } catch (error) {
            console.error('Cache cleanup error:', error);
        }
    }

    static async clearAllModels(): Promise<void> {
        try {
            const modelKeys = await this.getModelKeys();
            
            await Promise.all([
                ...modelKeys.map(key => del(key)),
                caches.delete(CACHE_NAME)
            ]);
        } catch (error) {
            console.error('Clear all models error:', error);
        }
    }

    static async getCacheStats(): Promise<{ count: number; totalSize: number }> {
        try {
            const modelKeys = await this.getModelKeys();
            let totalSize = 0;

            for (const key of modelKeys) {
                const cached = await get<CachedModel>(key);
                if (cached?.data) {
                    totalSize += cached.data.byteLength;
                }
            }

            return { count: modelKeys.length, totalSize };
        } catch (error) {
            console.error('Cache stats error:', error);
            return { count: 0, totalSize: 0 };
        }
    }
}