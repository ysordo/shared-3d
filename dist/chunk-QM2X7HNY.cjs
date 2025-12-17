"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkTFV64WEUcjs = require('./chunk-TFV64WEU.cjs');


var _chunk4JD2YM6Jcjs = require('./chunk-4JD2YM6J.cjs');


var _chunkLAEENZFRcjs = require('./chunk-LAEENZFR.cjs');

// src/react/components/AdvancedOrbitControls.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AdvancedOrbitControls = ({
  options = {},
  enabled = true,
  children
}) => {
  const orchestrator = _chunkLAEENZFRcjs.useScene.call(void 0, );
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
  _chunkTFV64WEUcjs.usePlugin.call(void 0, 
    () => new (0, _chunk4JD2YM6Jcjs.AdvancedOrbitControlsPlugin)(stableOptions),
    enabled ? [stableOptions] : []
  );
  if (!enabled || !orchestrator) {
    return null;
  }
  const plugin = orchestrator.plugin("AdvancedOrbitControls");
  if (!plugin) {
    return null;
  }
  const state = {
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: _optionalChain([children, 'optionalCall', _ => _(state)]) });
};



exports.AdvancedOrbitControls = AdvancedOrbitControls;
