import { get, set, keys, del } from 'idb-keyval';

/**
 * CacheManager class to handle caching of 3D models using IndexedDB and Cache Storage API.
 * It provides methods to get, save, and clear cached models.
 * Models are cached for 7 days in IndexedDB and can be cleared after 30 days.
 */
export class CacheManager {
  static async getModel(url: string): Promise<ArrayBuffer | null> {
    try {
      // Verificar en IndexedDB primero
      const cached = await get<{ data: ArrayBuffer; timestamp: number }>(`model:${url}`);
      if (cached) {
        // Verificar si el modelo es reciente (menos de 7 días)
        const ageInDays = (Date.now() - cached.timestamp) / (1000 * 60 * 60 * 24);
        if (ageInDays < 7) {
          return cached.data;
        }
      }
      
      // Intentar con Cache Storage API
      const cache = await caches.open('3d-models');
      const response = await cache.match(url);
      if (response) {
        const data = await response.arrayBuffer();
        // Actualizar IndexedDB
        await set(`model:${url}`, { data, timestamp: Date.now() });
        return data;
      }
      
      return null;
    } catch (error) {
      console.error('Cache error:', error);
      return null;
    }
  }

  static async saveModel(url: string, data: ArrayBuffer) {
    try {
      // Guardar en IndexedDB
      await set(`model:${url}`, { data, timestamp: Date.now() });
      
      // Guardar en Cache Storage
      const cache = await caches.open('3d-models');
      await cache.put(url, new Response(data));
    } catch (error) {
      console.error('Cache save error:', error);
    }
  }

  static async clearExpiredModels() {
    try {
      const allKeys = await keys();
      const modelKeys = allKeys.filter(key => 
        typeof key === 'string' && key.startsWith('model:')
      );

      for (const key of modelKeys) {
        const cached = await get<{ timestamp: number }>(key);
        if (cached) {
          const ageInDays = (Date.now() - cached.timestamp) / (1000 * 60 * 60 * 24);
          if (ageInDays > 30) {
            await del(key);
          }
        }
      }
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }
}