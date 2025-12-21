import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-DPFoyHCW.cjs';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';
import 'three';

type AutoLODConfig = {
    /** [mediumDistance, lowDistance, hideDistance] */
    distances: [number, number, number];
    /** [mediumReduction, lowReduction] – porcentaje de vértices a mantener (ej. 0.5 = 50%) */
    reductionPercentages?: [number, number] | undefined;
};
/**
 * AutoLODSystemPlugin
 *
 * Plugin de Level of Detail automático basado en distancia a cámara.
 *
 * Características principales:
 * - Genera automáticamente 4 niveles LOD para el modelo activo: High, Medium (simplificado), Low (simplificado) y Empty (oculto).
 * - Usa SimplifyModifier de Three.js para reducción progresiva de geometría.
 * - Integración transparente con SceneOrchestrator: intercepta setModel y aplica LOD a nuevos modelos.
 * - Actualización en caliente de distancias y porcentajes de reducción sin recrear el plugin.
 * - Integración completa con el loop centralizado mediante preRender() (un único LOD.update por frame).
 * - Limpieza exhaustiva de geometrías, materiales y referencias en dispose().
 * - Optimizado para escenas complejas con modelos de alto polígono count.
 *
 * Ideal para optimización de rendimiento en visualizadores 3D con navegación libre.
 *
 * @example
 * new AutoLODSystemPlugin({
 *   distances: [20, 50, 100],
 *   reductionPercentages: [0.6, 0.25]
 * })
 */
declare class AutoLODSystemPlugin implements Plugin {
    readonly name = "AutoLODSystem";
    private camera;
    private orchestrator;
    private lods;
    private originalSetModel?;
    private config;
    private readonly simplifier;
    constructor(config: AutoLODConfig);
    install({ camera, orchestrator }: PluginContext): void;
    preRender(): void;
    update(newConfig: Partial<AutoLODConfig>): void;
    private applyLODToModel;
    private simplifyMeshes;
    private rebuildSimplifiedLevels;
    dispose(): void;
}

export { type AutoLODConfig, AutoLODSystemPlugin };
