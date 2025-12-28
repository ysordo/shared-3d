"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkPUHKVNJBcjs = require('./chunk-PUHKVNJB.cjs');


var _chunkNTCOPW47cjs = require('./chunk-NTCOPW47.cjs');

// src/react/components/MeasurementTool.tsx
var _react = require('react');
var MeasurementTool = ({
  enabled = true,
  pointRadius = 0.05,
  color = 65280,
  onMeasure
}) => {
  const handleMeasure = _react.useCallback.call(void 0, 
    (event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        _optionalChain([onMeasure, 'optionalCall', _ => _(
          event.distance,
          [event.points[0], event.points[1]]
        )]);
      }
    },
    [onMeasure]
  );
  const config = _react.useMemo.call(void 0, 
    () => ({
      enabled,
      pointRadius,
      color,
      onMeasure: handleMeasure
    }),
    [enabled, pointRadius, color, handleMeasure]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkNTCOPW47cjs.MeasurementToolPlugin)(), []);
  _chunkPUHKVNJBcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.MeasurementTool = MeasurementTool;
