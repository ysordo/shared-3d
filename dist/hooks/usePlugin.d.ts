import { b as Plugin } from '../SceneOrchestrator-BwV_edbe.js';
import '../core/loaders/HDRILoader.js';
import '../core/cache/types.js';
import 'three';

/**
 * usePlugin
 *
 * Hook avanzado para gestión de plugins con ciclo de vida óptimo.
 *
 * Corrección del bug reportado:
 * - El return del cleanup estaba dentro del if (shouldRecreate) → solo se registraba cuando se recreaba el plugin.
 * - Cuando la config no cambiaba (caso común), no había cleanup → plugin no se removía/dispose en unmount.
 * - Resultado: al volver a montar el componente, orchestrator.has(name) = true (plugin zombie) → no se instalaba nuevo.
 *
 * Solución:
 * - Cleanup siempre registrado (fuera del if) → dispose/remove garantizado en todo unmount.
 * - Recreación solo cuando config cambia (deep equality).
 * - Hot-update cuando config cambia pero plugin soporta update().
 *
 * @example
 * const config = useMemo(() => ({ enabled, bloom: { strength } }), [enabled, strength]);
 * usePlugin(() => new PostProcessingPlugin(), config);
 */
declare const usePlugin: <T extends Plugin>(factory: () => T, config: unknown, deps?: React.DependencyList) => T | null;

export { usePlugin };
