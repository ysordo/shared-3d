'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePlugin } from '../hooks/usePlugin';
import type { AOCPluginConfig } from '../../core/plugins/AdvancedOrbitControlsPlugin';
import { AdvancedOrbitControlsPlugin } from '../../core/plugins/AdvancedOrbitControlsPlugin';

type StateProps = {
  /** Estado actual de pan */
  readonly enablePan: boolean;
  /** Estado actual de rotación */
  readonly enableRotate: boolean;
  /** Estado actual de zoom */
  readonly enableZoom: boolean;
  /** Distancia mínima actual */
  readonly minDistance: number;
  /** Distancia máxima actual */
  readonly maxDistance: number;

  /** Actualizar pan (imperativo) */
  setEnablePan: (value: boolean) => void;
  /** Actualizar rotación (imperativo) */
  setEnableRotate: (value: boolean) => void;
  /** Actualizar zoom (imperativo) */
  setEnableZoom: (value: boolean) => void;
  /** Actualizar distancia mínima (imperativo) */
  setMinDistance: (value: number) => void;
  /** Actualizar distancia máxima (imperativo) */
  setMaxDistance: (value: number) => void;
};

type AdvancedOrbitControlsProps = Partial<AOCPluginConfig> & {
  children?: (state: StateProps) => React.ReactNode;
};

/**
 * AdvancedOrbitControls
 *
 * Componente declarativo avanzado para controles orbitales altamente configurables.
 *
 * Características:
 * - Configuración totalmente reactiva (props → hot-update automático vía plugin.update()).
 * - Exposición de estado actual + setters imperativos mediante render prop.
 * - Integración óptima con usePlugin inteligente: instancia única + update() en caliente.
 * - Setters directos sobre la instancia del plugin → fuente de verdad única.
 * - Fallback seguro a props iniciales mientras el plugin se inicializa.
 * - Componente headless puro (sin UI propia).
 *
 * Ideal para viewers complejos donde se necesite control dinámico de navegación
 * (ej. UI para togglear modos, sliders de distancia, presets).
 *
 * @example
 * <AdvancedOrbitControls enablePan={false} minDistance={2} maxDistance={10}>
 *   {({ enableRotate, setEnableRotate, minDistance, setMinDistance }) => (
 *     <div className="fixed top-4 left-4 space-y-4">
 *       <button onClick={() => setEnableRotate(!enableRotate)}>
 *         Rotate {enableRotate ? 'ON' : 'OFF'}
 *       </button>
 *       <input
 *         type="range"
 *         min="1"
 *         max="20"
 *         value={minDistance}
 *         onChange={(e) => setMinDistance(Number(e.target.value))}
 *       />
 *     </div>
 *   )}
 * </AdvancedOrbitControls>
 */
export const AdvancedOrbitControls: React.FC<AdvancedOrbitControlsProps> = ({
  enablePan = true,
  enableRotate = true,
  enableZoom = true,
  dampingFactor,
  panSpeed,
  rotateSpeed,
  zoomSpeed,
  minDistance = 0.1,
  maxDistance = 1000,
  minPolarAngle,
  maxPolarAngle,
  children,
}) => {
  // Configuración completa → fuente de verdad para deep equality en usePlugin
  const config = useMemo(
    () => ({
      enablePan,
      enableRotate,
      enableZoom,
      dampingFactor,
      panSpeed,
      rotateSpeed,
      zoomSpeed,
      minDistance,
      maxDistance,
      minPolarAngle,
      maxPolarAngle,
    }),
    [
      enablePan,
      enableRotate,
      enableZoom,
      dampingFactor,
      panSpeed,
      rotateSpeed,
      zoomSpeed,
      minDistance,
      maxDistance,
      minPolarAngle,
      maxPolarAngle,
    ]
  );
  const [_enablePan, setEnablePan] = useState<boolean>(enablePan);
  const [_enableRotate, setEnableRotate] = useState<boolean>(enableRotate);
  const [_enableZoom, setEnableZoom] = useState<boolean>(enableZoom);
  const [_minDistance, setMinDistance] = useState<number>(minDistance);
  const [_maxDistance, setMaxDistance] = useState<number>(maxDistance);

  // Factory estable (sin dependencias externas)
  const factory = useCallback(() => new AdvancedOrbitControlsPlugin(), []);

  // usePlugin maneja creación, hot-update y dispose automáticamente
  const plugin = usePlugin(factory, config);

  useEffect(() => {
    if (plugin) {
      plugin.enablePan = _enablePan;
      plugin.enableRotate = _enableRotate;
      plugin.enableZoom = _enableZoom;
      plugin.minDistance = _minDistance;
      plugin.maxDistance = _maxDistance;
    }
  }, [
    plugin,
    _enablePan,
    _enableRotate,
    _enableZoom,
    _minDistance,
    _maxDistance,
  ]);

  // Estado derivado: prioriza valores del plugin (actuales) sobre props iniciales
  const state = useMemo<StateProps>(
    () => ({
      enablePan: _enablePan,
      enableRotate: _enableRotate,
      enableZoom: _enableZoom,
      minDistance: _minDistance,
      maxDistance: _maxDistance,
      setEnablePan: (value: boolean) => setEnablePan(value),
      setEnableRotate: (value: boolean) => setEnableRotate(value),
      setEnableZoom: (value: boolean) => setEnableZoom(value),
      setMinDistance: (value: number) => setMinDistance(value),
      setMaxDistance: (value: number) => setMaxDistance(value),
    }),
    [_enablePan, _enableRotate, _enableZoom, _minDistance, _maxDistance]
  );

  return <>{children?.(state)}</>;
};
