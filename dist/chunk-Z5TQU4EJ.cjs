"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkQEXPEXQRcjs = require('./chunk-QEXPEXQR.cjs');


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
    [
      ...Object.values(options)
    ]
  );
  const plugin = _chunkQEXPEXQRcjs.usePlugin.call(void 0, 
    () => new (0, _chunk4JD2YM6Jcjs.AdvancedOrbitControlsPlugin)(stableOptions),
    enabled ? [...Object.values(stableOptions)] : []
  );
  const setEnablePan = _react.useCallback.call(void 0, 
    (enablePan) => {
      if (plugin) {
        plugin.enablePan = enablePan;
      }
    },
    [plugin]
  );
  const setEnableRotate = _react.useCallback.call(void 0, 
    (enableRotate) => {
      if (plugin) {
        plugin.enableRotate = enableRotate;
      }
    },
    [plugin]
  );
  const setEnableZoom = _react.useCallback.call(void 0, 
    (enableZoom) => {
      if (plugin) {
        plugin.enableZoom = enableZoom;
      }
    },
    [plugin]
  );
  const setMinDistance = _react.useCallback.call(void 0, 
    (minDistance) => {
      if (plugin) {
        plugin.minDistance = minDistance;
      }
    },
    [plugin]
  );
  const setMaxDistance = _react.useCallback.call(void 0, 
    (maxDistance) => {
      if (plugin) {
        plugin.maxDistance = maxDistance;
      }
    },
    [plugin]
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
      setEnablePan,
      setEnableRotate,
      setEnableZoom,
      setMinDistance,
      setMaxDistance
    };
  }, [plugin, setEnablePan, setEnableRotate, setEnableZoom, setMinDistance, setMaxDistance]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: enabled && state && _optionalChain([children, 'optionalCall', _ => _(state)]) });
};



exports.AdvancedOrbitControls = AdvancedOrbitControls;
