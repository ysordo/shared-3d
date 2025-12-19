import { b as Plugin } from '../SceneOrchestrator-uEPgybCc.cjs';
import '../core/loaders/HDRILoader.cjs';
import '../core/cache/types.cjs';
import 'three';

type Factory<T extends Plugin> = () => T | null;
/**
 * Hook definitivo para plugins con configuración reactiva.
 *
 * - Una instancia activa a la vez
 * - Configuración siempre fresca (recrea si deps cambian)
 * - Dispose garantizado
 * - Tree-shakeable y Strict Mode seguro
 */
declare const usePlugin: <T extends Plugin>(factory: Factory<T>, deps?: React.DependencyList, enabled?: boolean) => T | null;

export { usePlugin };
