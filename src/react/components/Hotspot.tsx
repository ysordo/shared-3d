'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import type { HotspotData } from '../../core/orchestrator/plugins/HotspotPlugin';
import { HotspotPlugin } from '../../core/orchestrator/plugins/HotspotPlugin';
import { THREE } from '../../lib';

type HotspotProps = {
  /** ID único del hotspot (requerido para diff eficiente) */
  id: string;
  /** Posición fija en espacio mundo */
  position: [number, number, number];
  /** Target opcional para seguimiento automático (si no se proporciona, usa posición fija) */
  target?: THREE.Object3D;
  /** Callback ejecutado al hacer click sobre el hotspot */
  onClick: () => void;
  /** Visibilidad del hotspot (opcional, default true) */
  visible?: boolean;
};

/**
 * Hotspot
 *
 * Componente declarativo para un único hotspot interactivo 3D.
 *
 * Características:
 * - Posición fija o seguimiento automático de un target (Object3D).
 * - Click callback configurable.
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + update() automático).
 * - Instancia dummy segura cuando no hay target → evita errores y mantiene ciclo de vida.
 * - Soporte opcional para visible (extensible sin breaking change).
 * - Componente headless puro (sin renderizado visual propio).
 *
 * Ideal para puntos de interés individuales, botones 3D o triggers interactivos.
 *
 * @example
 * <Hotspot
 *   id="info-btn"
 *   position={[0, 2, 0]}
 *   onClick={() => setPanelOpen(true)}
 * />
 *
 * // Con seguimiento
 * <Hotspot
 *   id="wheel-info"
 *   target={wheelObject}
 *   onClick={() => showWheelDetails()}
 * />
 */
export const Hotspot: React.FC<HotspotProps> = ({
  id,
  position,
  target,
  onClick,
  visible = true,
}) => {
  // Datos transformados → fuente de verdad para deep equality
  const pluginData = useMemo<HotspotData[]>(
    () => [
      {
        id,
        position: new THREE.Vector3(...position),
        target: target ?? undefined,
        onClick,
        visible,
      },
    ],
    [id, position, target, onClick, visible]
  );

  // Factory estable (sin dependencias)
  const factory = useCallback(() => new HotspotPlugin([]), []);

  // usePlugin maneja creación, hot-update (datos completos) y dispose automáticamente
  usePlugin(factory, pluginData);

  return null;
};
