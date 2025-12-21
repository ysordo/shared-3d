'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AutoLODSystemPlugin } from '../../core/orchestrator/plugins/AutoLODSystemPlugin';

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
export const AutoLODSystem: React.FC<AutoLODSystemProps> = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  reductionPercentages,
}) => {
  // Configuración completa → fuente de verdad para deep equality en usePlugin
  const config = useMemo(
    () => ({
      distances: [mediumDistance, lowDistance, hideDistance] as [number, number, number],
      reductionPercentages,
    }),
    [mediumDistance, lowDistance, hideDistance, reductionPercentages]
  );

  // Factory estable (sin dependencias externas)
  const factory = useCallback(() => new AutoLODSystemPlugin(config), []); // config inicial dummy, se actualiza en caliente

  // usePlugin maneja creación, hot-update y dispose automáticamente
  usePlugin(factory, config);

  return null;
};