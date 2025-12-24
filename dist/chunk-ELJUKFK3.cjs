"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkSA74WZGBcjs = require('./chunk-SA74WZGB.cjs');


var _chunkQTS2NOFLcjs = require('./chunk-QTS2NOFL.cjs');

// src/react/components/AdvancedOrbitControls.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AdvancedOrbitControls = ({
  enablePan = true,
  enableRotate = true,
  enableZoom = true,
  dampingFactor,
  panSpeed,
  rotateSpeed,
  zoomSpeed,
  minDistance = 0.1,
  maxDistance = 1e3,
  minPolarAngle,
  maxPolarAngle,
  children
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
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
  const [_enablePan, setEnablePan] = _react.useState.call(void 0, enablePan);
  const [_enableRotate, setEnableRotate] = _react.useState.call(void 0, enableRotate);
  const [_enableZoom, setEnableZoom] = _react.useState.call(void 0, enableZoom);
  const [_minDistance, setMinDistance] = _react.useState.call(void 0, minDistance);
  const [_maxDistance, setMaxDistance] = _react.useState.call(void 0, maxDistance);
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkQTS2NOFLcjs.AdvancedOrbitControlsPlugin)(), []);
  const plugin = _chunkSA74WZGBcjs.usePlugin.call(void 0, factory, config);
  _react.useEffect.call(void 0, () => {
    if (plugin) {
      plugin.enablePan = _enablePan;
      plugin.enableRotate = _enableRotate;
      plugin.enableZoom = _enableZoom;
      plugin.minDistance = _minDistance;
      plugin.maxDistance = _maxDistance;
    }
  }, [
    plugin,
    _enablePan,
    _enableRotate,
    _enableZoom,
    _minDistance,
    _maxDistance
  ]);
  const state = _react.useMemo.call(void 0, 
    () => ({
      enablePan: _enablePan,
      enableRotate: _enableRotate,
      enableZoom: _enableZoom,
      minDistance: _minDistance,
      maxDistance: _maxDistance,
      setEnablePan: (value) => setEnablePan(value),
      setEnableRotate: (value) => setEnableRotate(value),
      setEnableZoom: (value) => setEnableZoom(value),
      setMinDistance: (value) => setMinDistance(value),
      setMaxDistance: (value) => setMaxDistance(value)
    }),
    [_enablePan, _enableRotate, _enableZoom, _minDistance, _maxDistance]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: _optionalChain([children, 'optionalCall', _ => _(state)]) });
};



exports.AdvancedOrbitControls = AdvancedOrbitControls;
