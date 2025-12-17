"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunk3DACZ6YKcjs = require('./chunk-3DACZ6YK.cjs');


var _chunk44UQAST6cjs = require('./chunk-44UQAST6.cjs');

// src/react/components/MeasurementTool.tsx
var _react = require('react');
var MeasurementTool = ({
  enabled = true,
  onMeasure
}) => {
  const callback = _react.useMemo.call(void 0, () => _nullishCoalesce(onMeasure, () => ( (() => {
  }))), [onMeasure]);
  _chunk3DACZ6YKcjs.usePlugin.call(void 0, 
    () => new (0, _chunk44UQAST6cjs.MeasurementToolPlugin)((event) => {
      if (event.distance !== void 0 && event.points.length === 2) {
        callback(event.distance, [event.points[0], event.points[1]]);
      }
    }),
    enabled ? [callback] : []
  );
  if (!enabled) {
    return null;
  }
  return null;
};



exports.MeasurementTool = MeasurementTool;
