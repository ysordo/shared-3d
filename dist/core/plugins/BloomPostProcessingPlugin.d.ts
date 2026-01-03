import { b as Plugin, P as PluginContext } from '../../index-vk5WYF3C.js';
import '../loaders/loaders.d.js';
import 'three';
import '../cache/types.js';

type BloomPostProcessingConfig = {
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
 * BloomPostProcessingPlugin
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
 * new BloomPostProcessingPlugin({
 *   enabled: true,
 *   bloom: { strength: 1.8, radius: 0.6, threshold: 0.1 }
 * })
 */
declare class BloomPostProcessingPlugin implements Plugin {
    readonly name = "BloomPostProcessing";
    private composer;
    private bloomPass;
    private enabled;
    private config;
    constructor(config?: BloomPostProcessingConfig);
    install({ scene, camera, renderer }: PluginContext): void;
    postRender(): void;
    resize(width: number, height: number): void;
    update(newConfig: Partial<BloomPostProcessingConfig>): void;
    dispose(): void;
}

export { type BloomPostProcessingConfig, BloomPostProcessingPlugin };
