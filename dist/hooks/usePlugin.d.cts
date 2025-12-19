import { b as Plugin } from '../SceneOrchestrator-uEPgybCc.cjs';
import '../core/loaders/HDRILoader.cjs';
import '../core/cache/types.cjs';
import 'three';

declare const usePlugin: <T extends Plugin>(factory: () => T, deps?: any[], name?: string) => T | undefined;

export { usePlugin };
