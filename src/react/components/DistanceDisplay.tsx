/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useScene } from '../../hooks/useScene';
import * as THREE from 'three';

type DistanceUnit = 'm' | 'cm' | 'mm' | 'px' | 'in' | 'ft' | 'km';

type DistanceDisplayProps = {
  children: (data: {
    distance: number;
    formatted: string;
    percentage: number;
    initialDistance: number;
    formattedInitial: string;
  }) => React.ReactNode;
  className?: string;
  unit?: DistanceUnit;
  decimals?: number;
};

const unitConversions: Record<DistanceUnit, number> = {
  m: 1,
  cm: 100,
  mm: 1000,
  px: 3779.527559, // 1m ≈ 3779.53px (96 DPI)
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

export const DistanceDisplay: React.FC<DistanceDisplayProps> = ({
  children,
  className,
  unit = 'm',
  decimals = 2,
}) => {
  const orchestrator = useScene();
  const animationRef = useRef<number>(0);
  const [currentDistance, setCurrentDistance] = useState(0);
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

  useEffect(() => {
    const update = () => {
      const dist = getCurrentDistance();

      // Capturar distancia inicial solo una vez
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

  if (initialDistance === null) {
    return <div className={className}>Calculating initial distance…</div>;
  }

  const percentage = Math.max(
    0,
    Math.min(100, (currentDistance / initialDistance) * 100)
  );
  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(initialDistance, unit, decimals);

  return (
    <div className={className}>
      {children({
        distance: currentDistance,
        formatted,
        percentage,
        initialDistance,
        formattedInitial,
      })}
    </div>
  );
};
