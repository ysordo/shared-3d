type HighResPostProcessingProps = {
    /** Habilitar/deshabilitar el post-processing de alta resolución */
    enabled?: boolean;
    /** Exposición del tone mapping (brillo general) */
    toneMappingExposure?: number;
    /** Multisampling (MSAA): 0=off, 4-16 (8 recomendado para 4K, 4 para performance) */
    multisampling?: number;
    /** Tipo de anti-aliasing post: 'smaa' (nitidez máxima), 'fxaa' (más suave), 'none' */
    aaType?: 'smaa' | 'fxaa' | 'none';
    /** Super-sampling: >1 para más detalle (ej: 1.5 en 4K, costoso), 1=normal */
    superSampling?: number;
};
/**
 * HighResPostProcessing
 *
 * Componente declarativo para visualización en alta resolución (HD/UHD/4K/8K)
 * con máxima nitidez y sin efectos de lente (DoF, vignette, grain, bloom).
 *
 * Optimizado para pantallas high-DPI con MSAA + SMAA/FXAA y tone mapping HDR.
 *
 * @example
 * <HighResPostProcessing
 *   enabled={true}
 *   multisampling={8}
 *   aaType="smaa"
 *   superSampling={1}
 * />
 */
declare const HighResPostProcessing: React.FC<HighResPostProcessingProps>;

export { HighResPostProcessing };
