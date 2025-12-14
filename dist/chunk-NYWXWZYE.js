import {
  useScene
} from "./chunk-IGP2K3AF.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/DistanceDisplay.tsx
import { useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
var unitConversions = {
  m: 1,
  cm: 100,
  mm: 1e3,
  px: 3779.527559,
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
  callback,
  className,
  unit = "m",
  decimals = 2
}) => {
  const orchestrator = useScene();
  const animationRef = useRef(0);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(0);
  const percentage = useRef(0);
  const [initialDistance, setInitialDistance] = useState(null);
  const getCurrentDistance = () => {
    const model = orchestrator.getActiveModel();
    if (!model || !orchestrator.camera) {
      return 0;
    }
    const modelCenter = new THREE.Vector3();
    model.getWorldPosition(modelCenter);
    return orchestrator.camera.position.distanceTo(modelCenter);
  };
  const calculateDistances = () => {
    const model = orchestrator.getActiveModel();
    const camera = orchestrator.camera;
    if (!model || !camera) {
      return;
    }
    let minDist = 0;
    let maxDist = 50;
    if (orchestrator.has("AdvancedCameraCollision")) {
      const collisionPlugin = orchestrator.plugin(
        "AdvancedCameraCollision"
      );
      const threshold = collisionPlugin.distanceThreshold + collisionPlugin.pushBackOffset;
      const modelCenter = new THREE.Vector3();
      model.getWorldPosition(modelCenter);
      const dir = new THREE.Vector3().subVectors(camera.position, modelCenter);
      const distanceToCenter = dir.length();
      if (distanceToCenter === 0) {
        dir.set(0, 0, 1);
      }
      dir.normalize();
      const ray = new THREE.Raycaster(
        modelCenter,
        dir,
        0,
        distanceToCenter + 0.1
      );
      const hits = ray.intersectObject(model, true);
      if (hits.length > 0) {
        const nearestHit = hits.reduce(
          (closest, hit) => hit.distance < closest.distance ? hit : closest,
          hits[0]
        );
        minDist = Math.max(
          nearestHit.distance + collisionPlugin.pushBackOffset,
          threshold
        );
      } else {
        minDist = threshold;
      }
    }
    let controls = null;
    if (orchestrator.has("AdvancedOrbitControls")) {
      controls = orchestrator.plugin("AdvancedOrbitControls");
    } else if (orchestrator.has("OrbitControls")) {
      controls = orchestrator.plugin("OrbitControls");
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
    percentage.current = maxDistance > minDistance ? Math.max(
      0,
      Math.min(
        100,
        (currentDistance - minDistance) / (maxDistance - minDistance) * 100
      )
    ) : 0;
  }, [currentDistance]);
  if (initialDistance === null) {
    return callback || null;
  }
  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(initialDistance, unit, decimals);
  return /* @__PURE__ */ jsx("div", { className, children: children({
    distance: currentDistance,
    formatted,
    percentage: percentage.current,
    initialDistance,
    formattedInitial
  }) });
};

export {
  DistanceDisplay
};
