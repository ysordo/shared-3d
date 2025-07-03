import { get, set, keys, del } from 'idb-keyval';

/**
 * CacheManager class to handle caching of 3D models using IndexedDB and Cache Storage API.
 * It provides methods to get, save, and clear cached models.
 * Models are cached for 7 days in IndexedDB and can be cleared after 30 days.
 * This class is designed to optimize the loading of 3D models by checking the cache before making network requests.
 * @example
 * ```tsx
 * import { CacheManager } from '@types/shared-3d';
 * const modelUrl = 'https://example.com/model.glb';
 * // // To get a model from the cache
 * const modelData = await CacheManager.getModel(modelUrl);
 * if (modelData) {
 *   // Use the cached model data
 * } else {
 *   // Load the model from the network
 *   const response = await fetch(modelUrl);
 *   const modelData = await response.arrayBuffer();
 *   // Save the model to the cache
 *   await CacheManager.saveModel(modelUrl, modelData);
 * }
 * // To clear expired models from the cache
 * await CacheManager.clearExpiredModels();
 * ```
 */
export class CacheManager {
  /**
   * Retrieves a 3D model from the cache.
   * It first checks IndexedDB for a cached model and then checks the Cache Storage API.
   * If the model is found in IndexedDB and is less than 7 days old, it returns the model data.
   * If not found, it checks the Cache Storage API and updates IndexedDB if the model is found there.
   * @param {string} url - The URL of the 3D model to retrieve.
   * @returns {Promise<ArrayBuffer | null>} The cached model data or null if not found.
   */
  static async getModel(url: string): Promise<ArrayBuffer | null> {
    try {
      // Verify in indexeddb first
      const cached = await get<{ data: ArrayBuffer; timestamp: number }>(`model:${url}`);
      if (cached) {
        // Verify if the model is recent (less than 7 days)
        const ageInDays = (Date.now() - cached.timestamp) / (1000 * 60 * 60 * 24);
        if (ageInDays < 7) {
          return cached.data;
        }
      }
      
      // Check Cache Storage API
      const cache = await caches.open('3d-models');
      const response = await cache.match(url);
      if (response) {
        const data = await response.arrayBuffer();
        // Update IndexedDB
        await set(`model:${url}`, { data, timestamp: Date.now() });
        return data;
      }
      
      return null;
    } catch (error) {
      console.error('Cache error:', error);
      return null;
    }
  }

  /**
   * Saves a 3D model to the cache.
   * It saves the model data in IndexedDB and also in Cache Storage API.
   * @param {string} url - The URL of the 3D model to save.
   * @param {ArrayBuffer} data - The model data to save.
   * @returns {Promise<void>} A promise that resolves when the model is saved.
   */
  static async saveModel(url: string, data: ArrayBuffer): Promise<void> {
    try {
      // Save in IndexedDB
      await set(`model:${url}`, { data, timestamp: Date.now() });
      
      // Save in Cache Storage API
      const cache = await caches.open('3d-models');
      await cache.put(url, new Response(data));
    } catch (error) {
      console.error('Cache save error:', error);
    }
  }

  /**
   * Clears expired models from the cache.
   * It checks all cached models in IndexedDB and removes those that are older than 30 days.
   * This helps to keep the cache clean and prevent it from growing indefinitely.
   * @returns {Promise<void>} A promise that resolves when the cleanup is complete.
   */
  static async clearExpiredModels(): Promise<void> {
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