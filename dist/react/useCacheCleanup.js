'use client';
import { useEffect } from 'react';
import { CacheManager } from '../core/CacheManager';
export const useCacheCleanup = () => {
    useEffect(() => {
        // Limpiar caché expirado cada 24 horas
        const interval = setInterval(() => {
            CacheManager.clearExpiredModels();
        }, 24 * 60 * 60 * 1000);
        // Limpiar al montar
        CacheManager.clearExpiredModels();
        return () => clearInterval(interval);
    }, []);
};
//# sourceMappingURL=useCacheCleanup.js.map