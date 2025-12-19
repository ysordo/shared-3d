import { b as Plugin } from '../SceneOrchestrator-BNc555Bu.js';
import '../core/loaders/HDRILoader.js';
import '../core/cache/types.js';
import 'three';

declare const usePlugin: <T extends Plugin>(factory: () => T, deps?: any[]) => T | undefined;

export { usePlugin };
