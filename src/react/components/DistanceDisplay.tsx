'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useScene } from '../../hooks/useScene';
import { THREE } from '../../lib';

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
    const model = orchestrator.getActiveModel();
    if (!model || !orchestrator.camera) {
      return 0;
    }

    const modelCenter = new THREE.Vector3();
    model.getWorldPosition(modelCenter);
    return orchestrator.camera.position.distanceTo(modelCenter);
  };

  const calculateDistances = () => {
    let minDist = 0;
    let maxDist = 0;

    const model = orchestrator.getActiveModel();
    if (!model || !orchestrator.camera) {
      return;
    }

    // Distancia real después del repeler de AdvancedCameraCollision
    const collisionPlugin = orchestrator.plugin('AdvancedCameraCollision');
    if (collisionPlugin) {
      const threshold =
        (collisionPlugin as any).distanceThreshold +
        (collisionPlugin as any).pushBackOffset;

      // Posición actual de la cámara
      const camPos = orchestrator.camera.position.clone();
      const modelCenter = new THREE.Vector3();
      model.getWorldPosition(modelCenter);

      const realDistance = camPos.distanceTo(modelCenter);
      minDist = Math.max(threshold, realDistance);
    }

    // Revisar si hay OrbitControls o AdvancedOrbitControls
    const controls =
      orchestrator.plugin('AdvancedOrbitControls') ||
      orchestrator.plugin('OrbitControls');
    if (controls) {
      maxDist = (controls as any).maxDistance ?? 50;
      if (minDist === 0) {
        minDist = (controls as any).minDistance ?? 0;
      }
    }

    setMinDistance(minDist);
    setMaxDistance(maxDist);
  };

  useEffect(() => {
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
    return callback || null;
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
