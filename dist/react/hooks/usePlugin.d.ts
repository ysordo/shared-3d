import { b as Plugin } from '../../index-vk5WYF3C.js';
import '../../core/loaders/loaders.d.js';
import 'three';
import '../../core/cache/types.js';

/**
 * usePlugin
 *
 * Hook avanzado para gestión de plugins con ciclo de vida óptimo y separación clara.
 *
 * Comportamiento en cambio de página (Next.js App Router o SPA):
 * - El SceneOrchestrator es singleton global (provider persistente).
 * - Al navegar a otra página:
 *   • Componente se desmonta → cleanup ejecutado → plugin.dispose() + orchestrator.remove(name).
 *   • Plugin eliminado del orchestrator → zero zombies.
 * - Al volver o ir a nueva página con mismo plugin:
 *   • Nuevo mount → effect 1 crea e instala instancia fresca.
 *   • Config inicial aplicada (factory recibe valores actuales).
 *   • effect 2 aplica hot-updates si config cambia después.
 * - Resultado: plugin siempre instalado con valores de la página actual.
 *
 * @example
 * // En Página A
 * <PostProcessing strength={1.0} />
 *
 * // Navegar a Página B
 * <PostProcessing strength={2.5} /> → nueva instancia con strength=2.5
 */
declare const usePlugin: <T extends Plugin>(factory: () => T, config: unknown, deps?: React.DependencyList) => T | undefined;

export { usePlugin };
