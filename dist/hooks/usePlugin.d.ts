import { b as Plugin } from '../SceneOrchestrator-BwV_edbe.js';
import '../core/loaders/HDRILoader.js';
import '../core/cache/types.js';
import 'three';

/**
 * usePlugin
 *
 * Hook avanzado y production-ready para registrar plugins en SceneOrchestrator.
 *
 * Características clave:
 * - Instancia única mientras la configuración sea semánticamente igual (deep equality ligera).
 * - Recreación automática solo cuando cambia algo relevante.
 * - Hot-update mediante plugin.update() cuando está disponible (ideal para plugins costosos).
 * - Zero dependencias externas → tree-shakeable y sin errores de tipos.
 * - Totalmente compatible con StrictMode, Fast Refresh y navegación SPA.
 * - Limpieza segura en unmount.
 *
 * @example
 * const config = useMemo(() => ({ enabled, bloom: { strength } }), [enabled, strength]);
 * usePlugin(() => new PostProcessingPlugin(), config);
 */
declare const usePlugin: <T extends Plugin>(factory: () => T, config: unknown, deps?: React.DependencyList) => T | null;

export { usePlugin };
