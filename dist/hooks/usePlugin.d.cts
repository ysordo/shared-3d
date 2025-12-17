import { b as Plugin } from '../SceneOrchestrator-NoU3ML5L.cjs';
import '../core/loaders/HDRILoader.cjs';
import '../core/cache/types.cjs';
import 'three';

declare const usePlugin: <T extends Plugin>(factory: () => T, deps?: any[]) => void;

export { usePlugin };
