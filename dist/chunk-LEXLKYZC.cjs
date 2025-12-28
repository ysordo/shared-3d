"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkGTPEJRWQcjs = require('./chunk-GTPEJRWQ.cjs');


var _chunkNJFICWZPcjs = require('./chunk-NJFICWZP.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/DistanceDisplay.tsx
var _react = require('react'); var _react2 = _interopRequireDefault(_react);
var _jsxruntime = require('react/jsx-runtime');
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
  const orchestrator = _chunkNJFICWZPcjs.useScene.call(void 0, );
  const model = _chunkGTPEJRWQcjs.useActiveModel.call(void 0, );
  const animationRef = _react.useRef.call(void 0, 0);
  const [currentDistance, setCurrentDistance] = _react.useState.call(void 0, 0);
  const [minDistance, setMinDistance] = _react.useState.call(void 0, 0);
  const [maxDistance, setMaxDistance] = _react.useState.call(void 0, 50);
  const [initialDistance, setInitialDistance] = _react.useState.call(void 0, null);
  const updateLimits = _react2.default.useCallback(() => {
    if (!orchestrator) {
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
      calculatedMax = _nullishCoalesce(controls.maxDistance, () => ( calculatedMax));
      if (calculatedMin === 0) {
        calculatedMin = _nullishCoalesce(controls.minDistance, () => ( 0));
      }
    }
    setMinDistance(calculatedMin);
    setMaxDistance(calculatedMax);
  }, [orchestrator]);
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    updateLimits();
  }, [
    orchestrator,
    model,
    // ← nuevo: si cambia el modelo, puede afectar collision
    updateLimits
  ]);
  const updateDistance = _react2.default.useCallback(() => {
    if (!orchestrator) {
      return 0;
    }
    const camera = orchestrator.camera;
    if (!model || !camera) {
      return 0;
    }
    const center = new _chunkEA3XQ4KJcjs.THREE.Vector3();
    model.getWorldPosition(center);
    return camera.position.distanceTo(center);
  }, [orchestrator, model]);
  _react.useEffect.call(void 0, () => {
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
  const percentage = maxDistance > minDistance ? Math.max(
    0,
    Math.min(
      100,
      (currentDistance - minDistance) / (maxDistance - minDistance) * 100
    )
  ) : 0;
  const safeInitial = _nullishCoalesce(initialDistance, () => ( currentDistance));
  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(safeInitial, unit, decimals);
  if (currentDistance === 0 && fallback) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: fallback });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children({
    distance: currentDistance,
    formatted,
    percentage,
    initialDistance: safeInitial,
    formattedInitial
  }) });
};



exports.DistanceDisplay = DistanceDisplay;
