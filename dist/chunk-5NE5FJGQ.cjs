"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk3M257MS7cjs = require('./chunk-3M257MS7.cjs');


var _chunk4JD2YM6Jcjs = require('./chunk-4JD2YM6J.cjs');

// src/react/components/AdvancedOrbitControls.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AdvancedOrbitControls = ({
  options = {},
  enabled = true,
  children
}) => {
  const stableOptions = _react.useMemo.call(void 0, 
    () => ({ ...options }),
    [...Object.values(options)]
  );
  const [enable, setEnable] = _react.useState.call(void 0, {
    pan: _nullishCoalesce(stableOptions.enablePan, () => ( true)),
    rotate: _nullishCoalesce(stableOptions.enableRotate, () => ( true)),
    zoom: _nullishCoalesce(stableOptions.enableZoom, () => ( true))
  });
  const [distance, setDistance] = _react.useState.call(void 0, {
    min: _nullishCoalesce(stableOptions.minDistance, () => ( 0.1)),
    max: _nullishCoalesce(stableOptions.maxDistance, () => ( 1e3))
  });
  const deps = _react.useMemo.call(void 0, 
    () => [...Object.values(stableOptions), enabled],
    [...Object.values(stableOptions), enabled]
  );
  const plugin = _chunk3M257MS7cjs.usePlugin.call(void 0, 
    new (0, _chunk4JD2YM6Jcjs.AdvancedOrbitControlsPlugin)(stableOptions),
    deps
  );
  _react.useEffect.call(void 0, () => {
    if (plugin) {
      if (plugin.enablePan !== enable.pan) {
        plugin.enablePan = enable.pan;
      }
      if (plugin.enableRotate !== enable.rotate) {
        plugin.enableRotate = enable.rotate;
      }
      if (plugin.enableZoom !== enable.zoom) {
        plugin.enableZoom = enable.zoom;
      }
    }
  }, [enable.pan, enable.rotate, enable.zoom, plugin]);
  _react.useEffect.call(void 0, () => {
    if (plugin) {
      if (plugin.maxDistance != distance.max) {
        plugin.maxDistance = distance.max;
      }
      if (plugin.minDistance !== distance.min) {
        plugin.minDistance = distance.min;
      }
    }
  }, [distance.max, distance.min, plugin]);
  const setEnablePan = _react.useCallback.call(void 0, (enablePan) => {
    setEnable((old) => ({ ...old, pan: enablePan }));
  }, []);
  const setEnableRotate = _react.useCallback.call(void 0, (enableRotate) => {
    setEnable((old) => ({ ...old, rotate: enableRotate }));
  }, []);
  const setEnableZoom = _react.useCallback.call(void 0, (enableZoom) => {
    setEnable((old) => ({ ...old, zoom: enableZoom }));
  }, []);
  const setMinDistance = _react.useCallback.call(void 0, (minDistance) => {
    setDistance((old) => ({ ...old, min: minDistance }));
  }, []);
  const setMaxDistance = _react.useCallback.call(void 0, (maxDistance) => {
    setDistance((old) => ({ ...old, max: maxDistance }));
  }, []);
  const state = _react.useMemo.call(void 0, () => {
    return {
      enablePan: enable.pan,
      enableRotate: enable.rotate,
      enableZoom: enable.zoom,
      minDistance: distance.min,
      maxDistance: distance.max,
      setEnablePan,
      setEnableRotate,
      setEnableZoom,
      setMinDistance,
      setMaxDistance
    };
  }, [
    enable.pan,
    enable.rotate,
    enable.zoom,
    distance.min,
    distance.max,
    setEnablePan,
    setEnableRotate,
    setEnableZoom,
    setMinDistance,
    setMaxDistance
  ]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: enabled && state && _optionalChain([children, 'optionalCall', _ => _(state)]) });
};



exports.AdvancedOrbitControls = AdvancedOrbitControls;
