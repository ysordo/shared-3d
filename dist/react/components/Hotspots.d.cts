import { HotspotData } from '../../core/plugins/HotspotPlugin.cjs';
import '../../index-DE4jh8VF.cjs';
import '../../core/loaders/loaders.d.cjs';
import 'three';
import '../../core/cache/types.cjs';

type HotspotsProps = {
    /** Array de hotspots a renderizar */
    hotspots: HotspotData[];
};
/**
 * Hotspots
 *
 * Componente declarativo para múltiples hotspots interactivos 3D.
 *
 * Características:
 * - Gestión centralizada de varios hotspots en una única instancia del plugin.
 * - Soporte para posición fija o seguimiento automático de target.
 * - Diff inteligente interno del plugin → add/update/remove en caliente.
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + update() automático).
 * - Transformación segura de tupla a Vector3 y extensión opcional de visible.
 * - Componente headless puro (sin renderizado visual propio).
 *
 * Ideal para listas dinámicas de puntos de interés, botones 3D o triggers múltiples.
 * Complementa perfectamente al componente <Hotspot /> individual (mismo formato de datos).
 *
 * @example
 * <Hotspots
 *   hotspots={[
 *     { id: 'door', position: [1, 1.5, 0], onClick: () => openDoor() },
 *     { id: 'engine', target: engineObject, onClick: () => showEngineInfo() }
 *   ]}
 * />
 */
declare const Hotspots: React.FC<HotspotsProps>;

export { Hotspots };
