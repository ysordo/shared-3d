import {
  useScene
} from "./chunk-IXZHJYWG.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/DistanceDisplay.tsx
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var unitConversions = {
  m: 1,
  cm: 100,
  mm: 1e3,
  px: 3779.527559,
  // ~96 DPI → 1m ≈ 3779.53px
  in: 39.3701,
  ft: 3.28084,
  km: 1e-3
};
var formatValue = (value, unit, decimals) => {
  const converted = value * unitConversions[unit];
  return `${converted.toFixed(decimals)}${unit}`;
};
var DistanceDisplay = ({
  children,
  fallback,
  className,
  unit = "m",
  decimals = 2
}) => {
  const orchestrator = useScene();
  const animationRef = useRef(0);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(50);
  const [initialDistance, setInitialDistance] = useState(null);
  const updateLimits = () => {
    if (!orchestrator) {
      return;
    }
    const model = orchestrator.getActiveModel();
    const camera = orchestrator.camera;
    if (!model || !camera) {
      return;
    }
    let calculatedMin = 0;
    let calculatedMax = 50;
    const collisionPlugin = orchestrator.plugin(
      "AdvancedCameraCollision"
    );
    if (collisionPlugin) {
      calculatedMin = collisionPlugin.distanceThreshold + collisionPlugin.pushBackOffset;
    }
    const controls = orchestrator.plugin(
      "AdvancedOrbitControls"
    ) || orchestrator.plugin("OrbitControls");
    if (controls) {
      calculatedMax = controls.maxDistance ?? calculatedMax;
      if (calculatedMin === 0) {
        calculatedMin = controls.minDistance ?? 0;
      }
    }
    setMinDistance(calculatedMin);
    setMaxDistance(calculatedMax);
  };
  const updateDistance = () => {
    if (!orchestrator) {
      return 0;
    }
    const model = orchestrator.getActiveModel();
    const camera = orchestrator.camera;
    if (!model || !camera) {
      return 0;
    }
    const modelCenter = new THREE.Vector3();
    model.getWorldPosition(modelCenter);
    return camera.position.distanceTo(modelCenter);
  };
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    updateLimits();
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
  }, [orchestrator]);
  const percentage = maxDistance > minDistance ? Math.max(
    0,
    Math.min(
      100,
      (currentDistance - minDistance) / (maxDistance - minDistance) * 100
    )
  ) : 0;
  const safeInitial = initialDistance ?? currentDistance;
  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(safeInitial, unit, decimals);
  if (currentDistance === 0 && fallback) {
    return /* @__PURE__ */ jsx(Fragment, { children: fallback });
  }
  return /* @__PURE__ */ jsx("div", { className, children: children({
    distance: currentDistance,
    formatted,
    percentage,
    initialDistance: safeInitial,
    formattedInitial
  }) });
};

export {
  DistanceDisplay
};
