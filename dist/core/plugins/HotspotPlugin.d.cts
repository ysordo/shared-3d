import { b as Plugin, P as PluginContext } from '../../index-BbV6Hzfa.cjs';
import * as THREE from 'three';
import '../loaders/loaders.d.cjs';
import '../cache/types.cjs';

type HotspotData = {
    id: string;
    position: THREE.Vector3;
    target?: THREE.Object3D | undefined;
    onClick: () => void;
    visible?: boolean;
};
/**
 * HotspotPlugin
 *
 * Plugin responsable de gestionar hotspots interactivos en la escena 3D.
 *
 * Características principales:
 * - Creación, actualización y eliminación dinámica de hotspots mediante diff inteligente.
 * - Soporte para posición fija o seguimiento automático de un target (Object3D).
 * - Billboard automático (siempre orientado hacia la cámara).
 * - Reutilización de geometría y material estáticos para optimizar memoria y draw calls.
 * - Integración completa con el loop centralizado del SceneOrchestrator (preRender).
 * - API reactiva vía update() para cambios en caliente desde componentes React.
 * - Limpieza segura de recursos en dispose() sin afectar instancias compartidas.
 *
 * Ideal para anotaciones interactivas, puntos de interés o UI 3D superpuesta.
 *
 * @example
 * new HotspotPlugin([
 *   { id: '1', position: new THREE.Vector3(0, 1, 0), onClick: () => console.log('click') }
 * ])
 */
declare class HotspotPlugin implements Plugin {
    readonly name = "Hotspot";
    private scene;
    private camera;
    private hotspots;
    private data;
    private static readonly geometry;
    private static readonly material;
    constructor(initialData?: HotspotData[]);
    install({ scene, camera }: PluginContext): void;
    preRender(): void;
    update(newData: HotspotData[]): void;
    private syncHotspots;
    private addHotspot;
    private updateHotspot;
    private removeHotspot;
    dispose(): void;
}

export { type HotspotData, HotspotPlugin };
