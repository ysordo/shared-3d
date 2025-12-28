import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-HtKaYZ3E.cjs';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';
import 'three';

type PostProcessingConfig = {
    /** Habilitar/deshabilitar todo el post-processing */
    enabled?: boolean;
    /** Configuración específica del efecto UnrealBloom */
    bloom?: {
        strength?: number;
        radius?: number;
        threshold?: number;
    };
};
/**
 * PostProcessingPlugin
 *
 * Plugin de post-procesado centrado en efecto Bloom (UnrealBloomPass) para resaltar emisivos.
 *
 * Características principales:
 * - EffectComposer + RenderPass + UnrealBloomPass configurables en caliente.
 * - Renderizado delegado a postRender() → integración perfecta con loop centralizado (reemplaza renderer.render).
 * - Actualización reactiva de parámetros bloom y enabled sin recrear pases.
 * - Gestión automática de resize mediante hook resize() llamado globalmente por SceneOrchestrator.
 * - Limpieza completa de recursos en dispose() (composer.dispose libera pases internos).
 * - Configuración por defecto optimizada para HDR/emisivos realistas.
 *
 * Ideal para escenas con materiales emisivos, iluminación dramática o estilo "glow" moderno.
 *
 * @example
 * new PostProcessingPlugin({
 *   enabled: true,
 *   bloom: { strength: 1.8, radius: 0.6, threshold: 0.1 }
 * })
 */
declare class PostProcessingPlugin implements Plugin {
    readonly name = "PostProcessing";
    private composer;
    private bloomPass;
    private enabled;
    private config;
    constructor(config?: PostProcessingConfig);
    install({ scene, camera, renderer }: PluginContext): void;
    postRender(): void;
    resize(width: number, height: number): void;
    update(newConfig: Partial<PostProcessingConfig>): void;
    dispose(): void;
}

export { type PostProcessingConfig, PostProcessingPlugin };
