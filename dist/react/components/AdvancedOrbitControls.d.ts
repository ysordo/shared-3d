import { AOCPluginConfig } from '../../core/orchestrator/plugins/AdvancedOrbitControlsPlugin.js';
import '../../SceneOrchestrator-DxWUNuG8.js';
import '../../core/loaders/HDRILoader.js';
import '../../core/cache/types.js';
import 'three';

type StateProps = {
    /** Estado actual de pan */
    readonly enablePan: boolean;
    /** Estado actual de rotación */
    readonly enableRotate: boolean;
    /** Estado actual de zoom */
    readonly enableZoom: boolean;
    /** Distancia mínima actual */
    readonly minDistance: number;
    /** Distancia máxima actual */
    readonly maxDistance: number;
    /** Actualizar pan (imperativo) */
    setEnablePan: (value: boolean) => void;
    /** Actualizar rotación (imperativo) */
    setEnableRotate: (value: boolean) => void;
    /** Actualizar zoom (imperativo) */
    setEnableZoom: (value: boolean) => void;
    /** Actualizar distancia mínima (imperativo) */
    setMinDistance: (value: number) => void;
    /** Actualizar distancia máxima (imperativo) */
    setMaxDistance: (value: number) => void;
};
type AdvancedOrbitControlsProps = Partial<AOCPluginConfig> & {
    children?: (state: StateProps) => React.ReactNode;
};
/**
 * AdvancedOrbitControls
 *
 * Componente declarativo avanzado para controles orbitales altamente configurables.
 *
 * Características:
 * - Configuración totalmente reactiva (props → hot-update automático vía plugin.update()).
 * - Exposición de estado actual + setters imperativos mediante render prop.
 * - Integración óptima con usePlugin inteligente: instancia única + update() en caliente.
 * - Setters directos sobre la instancia del plugin → fuente de verdad única.
 * - Fallback seguro a props iniciales mientras el plugin se inicializa.
 * - Componente headless puro (sin UI propia).
 *
 * Ideal para viewers complejos donde se necesite control dinámico de navegación
 * (ej. UI para togglear modos, sliders de distancia, presets).
 *
 * @example
 * <AdvancedOrbitControls enablePan={false} minDistance={2} maxDistance={10}>
 *   {({ enableRotate, setEnableRotate, minDistance, setMinDistance }) => (
 *     <div className="fixed top-4 left-4 space-y-4">
 *       <button onClick={() => setEnableRotate(!enableRotate)}>
 *         Rotate {enableRotate ? 'ON' : 'OFF'}
 *       </button>
 *       <input
 *         type="range"
 *         min="1"
 *         max="20"
 *         value={minDistance}
 *         onChange={(e) => setMinDistance(Number(e.target.value))}
 *       />
 *     </div>
 *   )}
 * </AdvancedOrbitControls>
 */
declare const AdvancedOrbitControls: React.FC<AdvancedOrbitControlsProps>;

export { AdvancedOrbitControls };
