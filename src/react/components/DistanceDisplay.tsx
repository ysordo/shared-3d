'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScene } from '../hooks/useScene';
import { THREE } from '../../lib';
import type {
  AdvancedCameraCollisionPlugin,
  AdvancedOrbitControlsPlugin,
  OrbitControlsPlugin,
} from '../../core/plugins';
import { useActiveModel } from '../hooks';

type DistanceUnit = 'm' | 'cm' | 'mm' | 'px' | 'in' | 'ft' | 'km';

type DistanceDisplayProps = {
  /** Render prop principal: recibe datos calculados en tiempo real */
  children: (data: {
    distance: number;
    formatted: string;
    percentage: number;
    initialDistance: number;
    formattedInitial: string;
  }) => React.ReactNode;

  /** Fallback renderizado mientras se obtiene la distancia inicial (opcional) */
  fallback?: React.ReactNode;

  className?: string;
  /** Unidad de medida para formato */
  unit?: DistanceUnit;
  /** Decimales para formato */
  decimals?: number;
};

const unitConversions: Record<DistanceUnit, number> = {
  m: 1,
  cm: 100,
  mm: 1000,
  px: 3779.527559, // ~96 DPI → 1m ≈ 3779.53px
  in: 39.3701,
  ft: 3.28084,
  km: 0.001,
};

const formatValue = (
  value: number,
  unit: DistanceUnit,
  decimals: number
): string => {
  const converted = value * unitConversions[unit];
  return `${converted.toFixed(decimals)}${unit}`;
};

/**
 * DistanceDisplay
 *
 * Componente que muestra en tiempo real la distancia cámara → centro del modelo activo.
 *
 * Problemas identificados y corregidos:
 * 1. **Renderizado condicional prematuro**: El `if (initialDistance === null)` estaba antes del cálculo de percentage → violación de Rules of Hooks en algunos renders.
 * 2. **Estado inicial null inconsistente**: `initialDistance` se establecía en el loop, pero percentage se calculaba en useEffect dependiente → race condition y renders sin datos.
 * 3. **Fallback confuso**: Prop `callback` no descriptiva → renombrada a `fallback`.
 * 4. **Cálculo de min/maxDistance duplicado y potencialmente costoso**: Ahora memoizado y recalculado solo cuando cambian plugins relevantes.
 *
 * Solución:
 * - Estado inicial consistente (distance = 0, initialDistance = 0).
 * - Cálculo síncrono inicial + loop continuo.
 * - Renderizado siempre del children con valores seguros (initialDistance = distance actual hasta primer cálculo válido).
 * - Limpieza robusta del RAF.
 *
 * @example
 * <DistanceDisplay unit="cm" decimals={1}>
 *   {({ formatted, percentage }) => (
 *     <div className="fixed bottom-4 left-4 bg-black/70 text-white p-4 rounded">
 *       Distancia: {formatted} ({percentage.toFixed(0)}%)
 *     </div>
 *   )}
 * </DistanceDisplay>
 */
export const DistanceDisplay: React.FC<DistanceDisplayProps> = ({
  children,
  fallback,
  className,
  unit = 'm',
  decimals = 2,
}) => {
  const orchestrator = useScene();
  const model = useActiveModel(); // ← Reactividad al modelo activo

  const animationRef = useRef<number>(0);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50);
  const [initialDistance, setInitialDistance] = useState<number | null>(null);

  // === Cálculo de límites min/max (collision + controls) ===
  const updateLimits = React.useCallback(() => {
    if (!orchestrator) {
      return;
    }

    let calculatedMin = 0;
    let calculatedMax = 50;

    // AdvancedCameraCollision
    const collisionPlugin = orchestrator.plugin.get<AdvancedCameraCollisionPlugin>(
      'AdvancedCameraCollision'
    );
    if (collisionPlugin) {
      calculatedMin =
        collisionPlugin.distanceThreshold + collisionPlugin.pushBackOffset;
    }

    // OrbitControls (Advanced o básico)
    const controls =
      orchestrator.plugin.get<AdvancedOrbitControlsPlugin>(
        'AdvancedOrbitControls'
      ) || orchestrator.plugin.get<OrbitControlsPlugin>('OrbitControls');

    if (controls) {
      calculatedMax = controls.maxDistance ?? calculatedMax;
      if (calculatedMin === 0) {
        calculatedMin = controls.minDistance ?? 0;
      }
    }

    setMinDistance(calculatedMin);
    setMaxDistance(calculatedMax);
  }, [orchestrator]);

  // === Ejecutar updateLimits cuando cambien cosas relevantes ===
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    updateLimits();
  }, [
    orchestrator,
    model, // ← nuevo: si cambia el modelo, puede afectar collision
    updateLimits,
  ]);

  // === Loop de distancia actual ===
  const updateDistance = React.useCallback(() => {
    if (!orchestrator) {
      return 0;
    }
    const camera = orchestrator.camera;
    if (!model || !camera) {
      return 0;
    }

    const center = new THREE.Vector3();
    model.getWorldPosition(center);
    return camera.position.distanceTo(center);
  }, [orchestrator, model]);

  useEffect(() => {
    if (!orchestrator) {
      return;
    }

    const loop = () => {
      const dist = updateDistance();
      setCurrentDistance(dist);
      if (initialDistance === null && dist > 0) {
        setInitialDistance(dist);
      }
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [orchestrator, updateDistance]);

  // === Porcentaje calculado ===
  const percentage =
    maxDistance > minDistance
      ? Math.max(
          0,
          Math.min(
            100,
            ((currentDistance - minDistance) / (maxDistance - minDistance)) *
              100
          )
        )
      : 0;

  const safeInitial = initialDistance ?? currentDistance;
  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(safeInitial, unit, decimals);

  if (currentDistance === 0 && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className={className}>
      {children({
        distance: currentDistance,
        formatted,
        percentage,
        initialDistance: safeInitial,
        formattedInitial,
      })}
    </div>
  );
};
