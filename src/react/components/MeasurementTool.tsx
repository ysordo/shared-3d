'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../hooks/usePlugin';
import { MeasurementToolPlugin } from '../../core/plugins/MeasurementToolPlugin';
import type { MeasurementEvent } from '../../core/plugins/MeasurementToolPlugin';
import type { THREE } from '../../lib';

type MeasurementToolProps = {
  /** Habilitar/deshabilitar la herramienta de medición */
  enabled?: boolean;
  /** Radio de las esferas que marcan los puntos seleccionados */
  pointRadius?: number;
  /** Color de puntos y línea (formato hexadecimal Three.js) */
  color?: number;
  /** Callback invocado al completar una medición (2 puntos) */
  onMeasure?: (
    distance: number,
    points: [THREE.Vector3, THREE.Vector3]
  ) => void;
};

/**
 * MeasurementTool
 *
 * Componente declarativo para herramienta de medición interactiva punto a punto.
 *
 * Características:
 * - Selección de 2 puntos sobre el modelo activo con feedback visual inmediato.
 * - Callback onMeasure con distancia y puntos finales (solo al completar).
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + update() automático).
 * - Integración óptima: instancia única + hot-update de color, radius y enabled.
 * - Componente headless puro (sin renderizado visual propio).
 *
 * Ideal para visualizadores técnicos donde el usuario necesite medir dimensiones reales.
 *
 * @example
 * <MeasurementTool
 *   enabled={isMeasuring}
 *   color={0xff0000}
 *   pointRadius={0.08}
 *   onMeasure={(distance, points) => {
 *     console.log(`Distancia: ${distance.toFixed(2)} unidades`);
 *   }}
 * />
 */
export const MeasurementTool: React.FC<MeasurementToolProps> = ({
  enabled = true,
  pointRadius = 0.05,
  color = 0x00ff00,
  onMeasure,
}) => {
  // Callback estabilizado y memoizado
  const handleMeasure = useCallback(
    (event: MeasurementEvent) => {
      if (event.distance !== undefined && event.points.length === 2) {
        onMeasure?.(event.distance, [event.points[0], event.points[1]] as [
          THREE.Vector3,
          THREE.Vector3
        ]);
      }
    },
    [onMeasure]
  );

  // Configuración completa → fuente de verdad para deep equality
  const config = useMemo(
    () => ({
      enabled,
      pointRadius,
      color,
      onMeasure: handleMeasure,
    }),
    [enabled, pointRadius, color, handleMeasure]
  );

  // Factory estable (sin dependencias externas)
  const factory = useCallback(() => new MeasurementToolPlugin(), []);

  // usePlugin maneja creación, hot-update y dispose automáticamente
  usePlugin(factory, config);

  return null;
};
