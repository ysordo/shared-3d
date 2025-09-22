/**
 * Shared 3D Library
 * This library provides components and utilities for managing 3D scenes using Three.js.
 * It includes scene management, model loading, lighting, and controls for 3D models.
 */
// ./core/*.ts
export * from './core/SceneManager';
export * from './core/CacheManager';
// ./react/*.(ts|tsx)
export * from './react/renders/AmbientLight';
export * from './react/components/AmbientLightController';
export * from './react/components/AnimationController';
export * from './react/components/DistanceDisplay';
export * from './react/renders/Material';
export * from './react/ModelLoader';
export * from './react/renders/OrbitControls';
export * from './react/hooks/SceneContext';
export * from './react/hooks/SceneProvider';
export * from './react/renders/TheaterLighting';
export * from './react/components/TheaterLightingController';
export * from './react/hooks/useCacheCleanup';
export * from './react/hooks/useScene';
// library three js
export * as THREE from 'three';
//# sourceMappingURL=index.js.map