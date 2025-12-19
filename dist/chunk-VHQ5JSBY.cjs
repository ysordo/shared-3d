"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkP3X2SDUWcjs = require('./chunk-P3X2SDUW.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/DistanceDisplay.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
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
  const orchestrator = _chunkP3X2SDUWcjs.useScene.call(void 0, );
  const animationRef = _react.useRef.call(void 0, 0);
  const [currentDistance, setCurrentDistance] = _react.useState.call(void 0, 0);
  const [minDistance, setMinDistance] = _react.useState.call(void 0, 0);
  const [maxDistance, setMaxDistance] = _react.useState.call(void 0, 0);
  const percentage = _react.useRef.call(void 0, 0);
  const [initialDistance, setInitialDistance] = _react.useState.call(void 0, null);
  const getCurrentDistance = () => {
    if (!orchestrator) {
      return 0;
    }
    const model = orchestrator.getActiveModel();
    if (!model || !orchestrator.camera) {
      return 0;
    }
    const modelCenter = new _chunkEA3XQ4KJcjs.THREE.Vector3();
    model.getWorldPosition(modelCenter);
    return orchestrator.camera.position.distanceTo(modelCenter);
  };
  const calculateDistances = () => {
    if (!orchestrator) {
      return;
    }
    const model = orchestrator.getActiveModel();
    const camera = orchestrator.camera;
    if (!model || !camera) {
      return;
    }
    let minDist = 0;
    let maxDist = 50;
    const collisionPlugin = orchestrator.plugin(
      "AdvancedCameraCollision"
    );
    if (collisionPlugin) {
      const threshold = collisionPlugin.distanceThreshold + collisionPlugin.pushBackOffset;
      const modelCenter = new _chunkEA3XQ4KJcjs.THREE.Vector3();
      model.getWorldPosition(modelCenter);
      const dir = new _chunkEA3XQ4KJcjs.THREE.Vector3().subVectors(camera.position, modelCenter);
      const distanceToCenter = dir.length();
      if (distanceToCenter === 0) {
        dir.set(0, 0, 1);
        dir.normalize();
        const ray = new _chunkEA3XQ4KJcjs.THREE.Raycaster(
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
    }
    const controls = orchestrator.plugin(
      "AdvancedOrbitControls"
    ) || orchestrator.plugin("OrbitControls");
    if (controls) {
      maxDist = _nullishCoalesce(controls.maxDistance, () => ( maxDist));
      if (minDist === 0) {
        minDist = _nullishCoalesce(controls.minDistance, () => ( 0));
      }
    }
    setMinDistance(minDist);
    setMaxDistance(maxDist);
  };
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
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
  _react.useEffect.call(void 0, () => {
    percentage.current = maxDistance > minDistance ? Math.max(
      0,
      Math.min(
        100,
        (currentDistance - minDistance) / (maxDistance - minDistance) * 100
      )
    ) : 0;
  }, [currentDistance]);
  if (initialDistance === null) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: callback });
  }
  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(initialDistance, unit, decimals);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children({
    distance: currentDistance,
    formatted,
    percentage: percentage.current,
    initialDistance,
    formattedInitial
  }) });
};



exports.DistanceDisplay = DistanceDisplay;
