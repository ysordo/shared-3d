export declare class CacheManager {
    /**
     * Obtiene un modelo verificando si hay cambios en el servidor
     */
    static getModel(url: string): Promise<ArrayBuffer | null>;
    /**
     * Obtiene modelo válido del cache (menos de 24h)
     */
    private static getValidCachedModel;
    /**
     * Verifica cambios en el servidor usando ETag o Last-Modified
     */
    private static checkForChanges;
    /**
     * Descarga y cachea el modelo con metadatos de validación
     */
    private static fetchAndCacheModel;
    /**
     * Guarda modelo con metadatos de validación
     */
    static saveModel(url: string, data: ArrayBuffer): Promise<void>;
    private static saveModelInternal;
    /**
     * Fuerza la verificación de cambios y actualización del cache
     */
    static validateAndUpdateCache(url: string): Promise<boolean>;
    /**
     * Programa verificación automática periódica de cambios
     */
    static startAutoValidation(checkIntervalMs?: number): void;
    private static getModelKeys;
    private static isOlderThan;
    static clearExpiredModels(): Promise<void>;
    static clearAllModels(): Promise<void>;
    static getCacheStats(): Promise<{
        count: number;
        totalSize: number;
    }>;
}
//# sourceMappingURL=CacheManager.d.ts.map