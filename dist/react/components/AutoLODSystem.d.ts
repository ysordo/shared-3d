type AutoLODSystemProps = {
    /** Distancia a partir de la cual se activa el nivel medio (en unidades del mundo) */
    mediumDistance?: number;
    /** Distancia a partir de la cual se activa el nivel bajo */
    lowDistance?: number;
    /** Distancia a partir de la cual el modelo se oculta completamente */
    hideDistance?: number;
    /** Porcentajes de reducción de vértices [medium, low] (ej. [0.6, 0.25] = 60% y 25%) */
    reductionPercentages?: [number, number];
};
/**
 * AutoLODSystem
 *
 * Componente declarativo para activar Level of Detail automático basado en distancia a cámara.
 *
 * Características:
 * - Configuración totalmente reactiva (cambios en props → hot-update automático).
 * - Integración óptima con usePlugin inteligente: instancia única + update() en caliente.
 * - Generación progresiva de LODs mediante SimplifyModifier (high → medium → low → hidden).
 * - Componente headless puro (sin renderizado visual).
 *
 * Ideal para optimización de rendimiento en modelos de alto polígono count con navegación libre.
 *
 * @example
 * <AutoLODSystem
 *   mediumDistance={15}
 *   lowDistance={40}
 *   hideDistance={80}
 *   reductionPercentages={[0.7, 0.3]}
 * />
 */
declare const AutoLODSystem: React.FC<AutoLODSystemProps>;

export { AutoLODSystem };
