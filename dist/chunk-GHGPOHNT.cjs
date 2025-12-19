"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkDLJXBVOIcjs = require('./chunk-DLJXBVOI.cjs');


var _chunk44UQAST6cjs = require('./chunk-44UQAST6.cjs');

// src/react/components/MeasurementTool.tsx
var _react = require('react');
var MeasurementTool = ({
  enabled = true,
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
  const deps = _react.useMemo.call(void 0, () => [callback, enabled], [callback, enabled]);
  _chunkDLJXBVOIcjs.usePlugin.call(void 0, new (0, _chunk44UQAST6cjs.MeasurementToolPlugin)(callback), deps);
  return null;
};



exports.MeasurementTool = MeasurementTool;
