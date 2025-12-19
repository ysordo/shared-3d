"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkHWK4I3V7cjs = require('./chunk-HWK4I3V7.cjs');


var _chunk4JD2YM6Jcjs = require('./chunk-4JD2YM6J.cjs');


var _chunk4FDANTNIcjs = require('./chunk-4FDANTNI.cjs');

// src/react/components/AdvancedOrbitControls.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AdvancedOrbitControls = ({
  options = {},
  enabled = true,
  children
}) => {
  const orchestrator = _chunk4FDANTNIcjs.useScene.call(void 0, );
  const stableOptions = _react.useMemo.call(void 0, 
    () => options,
    [
      options.enablePan,
      options.enableRotate,
      options.enableZoom,
      options.dampingFactor,
      options.panSpeed,
      options.rotateSpeed,
      options.zoomSpeed,
      options.minDistance,
      options.maxDistance,
      options.minPolarAngle,
      options.maxPolarAngle
    ]
  );
  _chunkHWK4I3V7cjs.usePlugin.call(void 0, 
    () => new (0, _chunk4JD2YM6Jcjs.AdvancedOrbitControlsPlugin)(stableOptions),
    enabled ? [stableOptions] : []
  );
  const plugin = orchestrator.plugin(
    "AdvancedOrbitControls"
  );
  const state = _react.useMemo.call(void 0, () => {
    if (!plugin) {
      return null;
    }
    return {
      enablePan: plugin.enablePan,
      enableRotate: plugin.enableRotate,
      enableZoom: plugin.enableZoom,
      minDistance: plugin.minDistance,
      maxDistance: plugin.maxDistance,
      setEnablePan: (enablePan) => {
        plugin.enablePan = enablePan;
      },
      setEnableRotate: (enableRotate) => {
        plugin.enableRotate = enableRotate;
      },
      setEnableZoom: (enableZoom) => {
        plugin.enableZoom = enableZoom;
      },
      setMinDistance: (minDistance) => {
        plugin.minDistance = minDistance;
      },
      setMaxDistance: (maxDistance) => {
        plugin.maxDistance = maxDistance;
      }
    };
  }, [
    _optionalChain([plugin, 'optionalAccess', _ => _.enablePan]),
    _optionalChain([plugin, 'optionalAccess', _2 => _2.enableRotate]),
    _optionalChain([plugin, 'optionalAccess', _3 => _3.enableZoom]),
    _optionalChain([plugin, 'optionalAccess', _4 => _4.maxDistance]),
    _optionalChain([plugin, 'optionalAccess', _5 => _5.minDistance])
  ]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: enabled && state && _optionalChain([children, 'optionalCall', _6 => _6(state)]) });
};



exports.AdvancedOrbitControls = AdvancedOrbitControls;
