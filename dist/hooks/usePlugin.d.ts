import { b as Plugin } from '../SceneOrchestrator-BNc555Bu.js';
import '../core/loaders/HDRILoader.js';
import '../core/cache/types.js';
import 'three';

/**
 * Hook profesional para registro seguro de plugins con configuración reactiva.
 *
 * - Una sola instancia activa en el orchestrator
 * - Configuración siempre actualizada
 * - Dispose correcto
 * - Compatible con React Strict Mode
 */
declare const usePlugin: <T extends Plugin | null>(factory: T, deps?: React.DependencyList) => T | null;

export { usePlugin };
