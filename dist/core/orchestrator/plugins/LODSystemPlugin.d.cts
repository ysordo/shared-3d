import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-CSrTns7D.cjs';
import * as THREE from 'three';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';

type LODLevel = {
    /** Distancia a partir de la cual se activa este nivel (mayor distancia = menor detalle) */
    distance: number;
    /** Modelo pre-generado para este nivel de detalle */
    model: THREE.Object3D;
};
type LODConfig = {
    /** Niveles de detalle ordenados por distancia creciente */
    levels: LODLevel[];
    /** Histéresis opcional para evitar flickering en transiciones (valor 0-1, default 0) */
    hysteresis?: number;
};
/**
 * LODSystemPlugin
 *
 * Plugin de Level of Detail manual basado en modelos predefinidos.
 *
 * Características principales:
 * - Permite definir niveles LOD explícitos proporcionando modelos alternativos (ej. baked low-poly, impostors).
 * - Switching determinista por distancia a cámara con soporte opcional para histéresis.
 * - Integración transparente con SceneOrchestrator: aplica LOD automáticamente al modelo activo y futuros.
 * - Actualización en caliente de configuración (niveles/hysteresis) sin recrear la instancia.
 * - Integración completa con el loop centralizado mediante preRender() (un único LOD.update por frame).
 * - Limpieza exhaustiva de recursos en dispose() para evitar memory leaks.
 *
 * Ideal para optimización avanzada donde se controlan manualmente los modelos de cada nivel
 * (ej. versiones simplificadas preparadas en Blender o herramientas externas).
 *
 * @example
 * new LODSystemPlugin({
 *   levels: [
 *     { distance: 0,   model: highDetailModel },
 *     { distance: 20,  model: mediumDetailModel },
 *     { distance: 50,  model: lowDetailModel },
 *     { distance: 100, model: emptyPlaceholder }
 *   ],
 *   hysteresis: 0.1
 * })
 */
declare class LODSystemPlugin implements Plugin {
    readonly name = "LODSystem";
    private camera;
    private orchestrator;
    private config;
    private lods;
    private originalSetModel?;
    constructor(config: LODConfig);
    install({ camera, orchestrator }: PluginContext): void;
    preRender(): void;
    update(newConfig: Partial<LODConfig>): void;
    private applyLOD;
    private buildLODLevels;
    private rebuildLOD;
    dispose(): void;
}

export { type LODConfig, LODSystemPlugin };
