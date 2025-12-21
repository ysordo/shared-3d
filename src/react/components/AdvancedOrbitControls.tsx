'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AdvancedOrbitControlsPlugin } from '../../core/orchestrator/plugins/AdvancedOrbitControlsPlugin';

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

type AdvancedOrbitControlsProps = {
  /** Habilitar/deshabilitar pan */
  enablePan?: boolean;
  /** Habilitar/deshabilitar rotación */
  enableRotate?: boolean;
  /** Habilitar/deshabilitar zoom */
  enableZoom?: boolean;
  /** Factor de damping (inercia) */
  dampingFactor?: number;
  /** Velocidad de pan */
  panSpeed?: number;
  /** Velocidad de rotación */
  rotateSpeed?: number;
  /** Velocidad de zoom */
  zoomSpeed?: number;
  /** Distancia mínima de cámara */
  minDistance?: number;
  /** Distancia máxima de cámara */
  maxDistance?: number;
  /** Ángulo polar mínimo (radianes) */
  minPolarAngle?: number;
  /** Ángulo polar máximo (radianes) */
  maxPolarAngle?: number;

  /** Render prop para exponer estado y controles imperativos */
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

  // Factory estable (sin dependencias externas)
  const factory = useCallback(() => new AdvancedOrbitControlsPlugin(), []);

  // usePlugin maneja creación, hot-update y dispose automáticamente
  const plugin = usePlugin(factory, config);

  // Setters imperativos que actúan directamente sobre la instancia (fuente de verdad)
  const setEnablePan = useCallback(
    (value: boolean) => {
      if (plugin) {
        plugin.enablePan = value;
      }
    },
    [plugin]
  );

  const setEnableRotate = useCallback(
    (value: boolean) => {
      if (plugin) {
        plugin.enableRotate = value;
      }
    },
    [plugin]
  );

  const setEnableZoom = useCallback(
    (value: boolean) => {
      if (plugin) {
        plugin.enableZoom = value;
      }
    },
    [plugin]
  );

  const setMinDistance = useCallback(
    (value: number) => {
      if (plugin) {
        plugin.minDistance = value;
      }
    },
    [plugin]
  );

  const setMaxDistance = useCallback(
    (value: number) => {
      if (plugin) {
        plugin.maxDistance = value;
      }
    },
    [plugin]
  );

  // Estado derivado: prioriza valores del plugin (actuales) sobre props iniciales
  const state = useMemo<StateProps>(
    () => ({
      enablePan: plugin?.enablePan ?? enablePan,
      enableRotate: plugin?.enableRotate ?? enableRotate,
      enableZoom: plugin?.enableZoom ?? enableZoom,
      minDistance: plugin?.minDistance ?? minDistance,
      maxDistance: plugin?.maxDistance ?? maxDistance,
      setEnablePan,
      setEnableRotate,
      setEnableZoom,
      setMinDistance,
      setMaxDistance,
    }),
    [
      plugin,
      enablePan,
      enableRotate,
      enableZoom,
      minDistance,
      maxDistance,
      setEnablePan,
      setEnableRotate,
      setEnableZoom,
      setMinDistance,
      setMaxDistance,
    ]
  );

  // Si aún no está inicializado el plugin → no renderizar children (evita estado inconsistente)
  if (!plugin) {
    return null;
  }

  return <>{children?.(state)}</>;
};
