import { b as Plugin } from '../SceneOrchestrator-D4TjWrSK.js';
import '../core/loaders/HDRILoader.js';
import '../core/cache/types.js';
import 'three';

declare const usePlugin: <T extends Plugin>(factory: () => T, deps?: any[]) => T | null;

export { usePlugin };
