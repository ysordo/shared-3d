"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkUA2EXMCPcjs = require('./chunk-UA2EXMCP.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/DistanceDisplay.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var unitConversions = {
  m: 1,
  cm: 100,
  mm: 1e3,
  px: 3779.527559,
  // 1m ≈ 3779.53px (96 DPI)
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
  className,
  unit = "m",
  decimals = 2
}) => {
  const orchestrator = _chunkUA2EXMCPcjs.useScene.call(void 0, );
  const animationRef = _react.useRef.call(void 0, 0);
  const [currentDistance, setCurrentDistance] = _react.useState.call(void 0, 0);
  const [initialDistance, setInitialDistance] = _react.useState.call(void 0, null);
  const getCurrentDistance = () => {
    const model = orchestrator.getActiveModel();
    if (!model || !orchestrator.camera) {
      return 0;
    }
    const modelCenter = new _chunkEA3XQ4KJcjs.THREE.Vector3();
    model.getWorldPosition(modelCenter);
    return orchestrator.camera.position.distanceTo(modelCenter);
  };
  _react.useEffect.call(void 0, () => {
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
  if (initialDistance === null) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: "Calculating initial distance\u2026" });
  }
  const percentage = Math.max(
    0,
    Math.min(100, currentDistance / initialDistance * 100)
  );
  const formatted = formatValue(currentDistance, unit, decimals);
  const formattedInitial = formatValue(initialDistance, unit, decimals);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className, children: children({
    distance: currentDistance,
    formatted,
    percentage,
    initialDistance,
    formattedInitial
  }) });
};



exports.DistanceDisplay = DistanceDisplay;
