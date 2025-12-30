'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../hooks/usePlugin';
import type { HotspotData } from '../../core/plugins/HotspotPlugin';
import { HotspotPlugin } from '../../core/plugins/HotspotPlugin';
import { THREE } from '../../lib';

type HotspotsProps = {
  /** Array de hotspots a renderizar */
  hotspots: HotspotData[];
};

/**
 * Hotspots
 *
 * Componente declarativo para múltiples hotspots interactivos 3D.
 *
 * Características:
 * - Gestión centralizada de varios hotspots en una única instancia del plugin.
 * - Soporte para posición fija o seguimiento automático de target.
 * - Diff inteligente interno del plugin → add/update/remove en caliente.
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + update() automático).
 * - Transformación segura de tupla a Vector3 y extensión opcional de visible.
 * - Componente headless puro (sin renderizado visual propio).
 *
 * Ideal para listas dinámicas de puntos de interés, botones 3D o triggers múltiples.
 * Complementa perfectamente al componente <Hotspot /> individual (mismo formato de datos).
 *
 * @example
 * <Hotspots
 *   hotspots={[
 *     { id: 'door', position: [1, 1.5, 0], onClick: () => openDoor() },
 *     { id: 'engine', target: engineObject, onClick: () => showEngineInfo() }
 *   ]}
 * />
 */
export const Hotspots: React.FC<HotspotsProps> = ({ hotspots }) => {
  // Transformación completa y memoizada → fuente de verdad para deep equality
  const pluginData = useMemo<HotspotData[]>(
    () =>
      hotspots.map((hotspot) => ({
        id: hotspot.id,
        position: new THREE.Vector3(...hotspot.position),
        target: hotspot.target ?? undefined,
        onClick: hotspot.onClick,
        visible: hotspot.visible ?? true,
      })),
    [hotspots]
  );

  // Factory estable (sin dependencias)
  const factory = useCallback(() => new HotspotPlugin([]), []);

  // usePlugin maneja creación, hot-update (datos completos) y dispose automáticamente
  usePlugin(factory, pluginData);

  return null;
};
