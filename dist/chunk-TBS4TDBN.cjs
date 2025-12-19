"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunk4JD2YM6Jcjs = require('./chunk-4JD2YM6J.cjs');

// src/react/components/AdvancedOrbitControls.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AdvancedOrbitControls = ({
  options = {},
  enabled = true,
  children
}) => {
  const {
    enablePan = true,
    enableRotate = true,
    enableZoom = true,
    minDistance = 0.1,
    maxDistance = 1e3,
    dampingFactor,
    panSpeed,
    rotateSpeed,
    zoomSpeed,
    minPolarAngle,
    maxPolarAngle
  } = options;
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunk4JD2YM6Jcjs.AdvancedOrbitControlsPlugin)({
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
      maxPolarAngle
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
      maxPolarAngle
    ]
  );
  const plugin = _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, [
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
    maxPolarAngle
  ]);
  const setEnablePan = _react.useCallback.call(void 0, (value) => {
    if (plugin) {
      plugin.enablePan = value;
    }
  }, [plugin]);
  const setEnableRotate = _react.useCallback.call(void 0, (value) => {
    if (plugin) {
      plugin.enableRotate = value;
    }
  }, [plugin]);
  const setEnableZoom = _react.useCallback.call(void 0, (value) => {
    if (plugin) {
      plugin.enableZoom = value;
    }
  }, [plugin]);
  const setMinDistance = _react.useCallback.call(void 0, (value) => {
    if (plugin) {
      plugin.minDistance = value;
    }
  }, [plugin]);
  const setMaxDistance = _react.useCallback.call(void 0, (value) => {
    if (plugin) {
      plugin.maxDistance = value;
    }
  }, [plugin]);
  const state = _react.useMemo.call(void 0, () => ({
    enablePan: _nullishCoalesce(_optionalChain([plugin, 'optionalAccess', _ => _.enablePan]), () => ( enablePan)),
    enableRotate: _nullishCoalesce(_optionalChain([plugin, 'optionalAccess', _2 => _2.enableRotate]), () => ( enableRotate)),
    enableZoom: _nullishCoalesce(_optionalChain([plugin, 'optionalAccess', _3 => _3.enableZoom]), () => ( enableZoom)),
    minDistance: _nullishCoalesce(_optionalChain([plugin, 'optionalAccess', _4 => _4.minDistance]), () => ( minDistance)),
    maxDistance: _nullishCoalesce(_optionalChain([plugin, 'optionalAccess', _5 => _5.maxDistance]), () => ( maxDistance)),
    setEnablePan,
    setEnableRotate,
    setEnableZoom,
    setMinDistance,
    setMaxDistance
  }), [
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
    setMaxDistance
  ]);
  if (!enabled || !plugin) {
    return null;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: _optionalChain([children, 'optionalCall', _6 => _6(state)]) });
};



exports.AdvancedOrbitControls = AdvancedOrbitControls;
