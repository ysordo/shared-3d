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
export declare class CacheManager {
    /**
     * Retrieves a 3D model from the cache.
     * It first checks IndexedDB for a cached model and then checks the Cache Storage API.
     * If the model is found in IndexedDB and is less than 7 days old, it returns the model data.
     * If not found, it checks the Cache Storage API and updates IndexedDB if the model is found there.
     * @param {string} url - The URL of the 3D model to retrieve.
     * @returns {Promise<ArrayBuffer | null>} The cached model data or null if not found.
     */
    static getModel(url: string): Promise<ArrayBuffer | null>;
    /**
     * Saves a 3D model to the cache.
     * It saves the model data in IndexedDB and also in Cache Storage API.
     * @param {string} url - The URL of the 3D model to save.
     * @param {ArrayBuffer} data - The model data to save.
     * @returns {Promise<void>} A promise that resolves when the model is saved.
     */
    static saveModel(url: string, data: ArrayBuffer): Promise<void>;
    /**
     * Clears expired models from the cache.
     * It checks all cached models in IndexedDB and removes those that are older than 30 days.
     * This helps to keep the cache clean and prevent it from growing indefinitely.
     * @returns {Promise<void>} A promise that resolves when the cleanup is complete.
     */
    static clearExpiredModels(): Promise<void>;
}
//# sourceMappingURL=CacheManager.d.ts.map