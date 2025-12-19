import { b as Plugin } from '../SceneOrchestrator-BNc555Bu.js';
import '../core/loaders/HDRILoader.js';
import '../core/cache/types.js';
import 'three';

/**
 * Hook estable para plugins.
 *
 * - Instancia única por lifetime del componente
 * - Instalado solo si no existe
 * - Dispose solo al desmontar
 * - Configuración reactiva mediante factory (ejecutada solo al montar o si key cambia)
 * - Totalmente estable en Strict Mode y Fast Refresh
 */
declare const usePlugin: <T extends Plugin>(factory: () => T, deps?: React.DependencyList) => T | null;

export { usePlugin };
