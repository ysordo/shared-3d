"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkIZR4YPSPcjs = require('./chunk-IZR4YPSP.cjs');

// src/react/components/MeasurementTool.tsx
var _react = require('react');
var MeasurementTool = ({
  enabled = true,
  pointRadius = 0.05,
  color = 65280,
  onMeasure
}) => {
  const callback = _react.useCallback.call(void 0, 
    (event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        _optionalChain([onMeasure, 'optionalCall', _ => _(event.distance, [event.points[0], event.points[1]])]);
      }
    },
    [onMeasure]
  );
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkIZR4YPSPcjs.MeasurementToolPlugin)({
      color,
      enabled,
      pointRadius,
      onMeasure: callback
    }),
    [color, enabled, pointRadius, callback]
  );
  const plugin = _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, []);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _2 => _2.update, 'call', _3 => _3({ color, enabled, pointRadius, onMeasure: callback })]);
  }, [color, enabled, pointRadius, callback, plugin]);
  return null;
};



exports.MeasurementTool = MeasurementTool;
