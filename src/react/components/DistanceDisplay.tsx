'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';
import type { AdvancedCameraCollisionPlugin } from '../../core';

type DistanceUnit = 'm' | 'cm' | 'mm' | 'px' | 'in' | 'ft' | 'km';

type DistanceDisplayProps = {
  children: (data: {
    distance: number;
    formatted: string;
    percentage: number;
    initialDistance: number;
    formattedInitial: string;
  }) => React.ReactNode;
  callback?: React.ReactNode;
  className?: string;
  unit?: DistanceUnit;
  decimals?: number;
};

const unitConversions: Record<DistanceUnit, number> = {
  m: 1,
  cm: 100,
  mm: 1000,
  px: 3779.527559,
  in: 39.3701,
  ft: 3.28084,
  km: 0.001,
};

const formatValue = (value: number, unit: DistanceUnit, decimals: number) => {
  const converted = value * unitConversions[unit];
  return `${converted.toFixed(decimals)}${unit}`;
};

export const DistanceDisplay: React.FC<DistanceDisplayProps> = ({
  children,
  callback,
  className,
  unit = 'm',
  decimals = 2,
}) => {
  const orchestrator = useScene();
  const animationRef = useRef<number>(0);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(0);
  const percentage = useRef<number>(0);
  const [initialDistance, setInitialDistance] = useState<number | null>(null);

  const getCurrentDistance = (): number => {
    if(!orchestrator){return 0;}
    const model = orchestrator.getActiveModel();
    if (!model || !orchestrator.camera) {
      return 0;
    }

    const modelCenter = new THREE.Vector3();
    model.getWorldPosition(modelCenter);
    return orchestrator.camera.position.distanceTo(modelCenter);
  };

  const calculateDistances = () => {
    if(!orchestrator){return;}
    const model = orchestrator.getActiveModel();
    const camera = orchestrator.camera;
    if (!model || !camera) {
      return;
    }

    let minDist = 0;
    let maxDist = 50; // valor por defecto

    // --- Colisión avanzada ---
    if (orchestrator.has('AdvancedCameraCollision')) {
      const collisionPlugin = orchestrator.plugin(
        'AdvancedCameraCollision'
      ) as AdvancedCameraCollisionPlugin;

      const threshold =
        collisionPlugin.distanceThreshold + collisionPlugin.pushBackOffset;

      const modelCenter = new THREE.Vector3();
      model.getWorldPosition(modelCenter);

      // Dirección desde el centro del modelo hacia la cámara
      const dir = new THREE.Vector3().subVectors(camera.position, modelCenter);
      const distanceToCenter = dir.length();
      if (distanceToCenter === 0) {
        dir.set(0, 0, 1);
      } // proteger vector cero
      dir.normalize();

      // Raycast limitado a la distancia actual + margen
      const ray = new THREE.Raycaster(
        modelCenter,
        dir,
        0,
        distanceToCenter + 0.1
      );
      const hits = ray.intersectObject(model, true);

      if (hits.length > 0) {
        const nearestHit = hits.reduce(
          (closest, hit) => (hit.distance < closest!.distance ? hit : closest),
          hits[0]
        );
        minDist = Math.max(
          nearestHit!.distance + collisionPlugin.pushBackOffset,
          threshold
        );
      } else {
        minDist = threshold;
      }
    }

    // --- Controles de cámara ---
    let controls: any = null;
    if (orchestrator.has('AdvancedOrbitControls')) {
      controls = orchestrator.plugin('AdvancedOrbitControls');
    } else if (orchestrator.has('OrbitControls')) {
      controls = orchestrator.plugin('OrbitControls');
    }

    if (controls) {
      maxDist = controls.maxDistance ?? maxDist;
      if (minDist === 0) {
        minDist = controls.minDistance ?? 0;
      }
    }

    setMinDistance(minDist);
    setMaxDistance(maxDist);
  };

  useEffect(() => {
    if(!orchestrator){return;}
    calculateDistances();

    const update = () => {
      const dist = getCurrentDistance();

      if (initialDistance === null && dist > 0) {
        setInitialDistance(dist);
      }

      setCurrentDistance(dist);
      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [orchestrator, initialDistance]);

  useEffect(() => {
    percentage.current =
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
  }, [currentDistance]);

  if (initialDistance === null) {
    return <>{callback}</>;
  }

  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(initialDistance, unit, decimals);

  return (
    <div className={className}>
      {children({
        distance: currentDistance,
        formatted,
        percentage: percentage.current,
        initialDistance,
        formattedInitial,
      })}
    </div>
  );
};
