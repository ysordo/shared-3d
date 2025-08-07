/**
 * Shared 3D Library
 * This library provides components and utilities for managing 3D scenes using Three.js.
 * It includes scene management, model loading, lighting, and controls for 3D models.
 */
// ./core/*.ts
export * from './core/SceneManager';
export * from './core/CacheManager';
// ./react/*.(ts|tsx)
export * from './react/AmbientLight';
export * from './react/AmbientLightController';
export * from './react/DistanceDisplay';
export * from './react/MaterialController';
export * from './react/ModelLoader';
export * from './react/OrbitControls';
export * from './react/SceneContext';
export * from './react/SceneProvider';
export * from './react/TheaterLighting';
export * from './react/TheaterLightingController';
export * from './react/useCacheCleanup';
export * from './react/useScene';
// library three js
export * as THREE from 'three';
//# sourceMappingURL=index.js.map