"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunkJ3ZUKSPFcjs = require('./chunk-J3ZUKSPF.cjs');

// src/react/components/postprocessing/HighResPostProcessing.tsx
var _react = require('react');
var HighResPostProcessing = ({
  enabled = true,
  toneMappingExposure = 1,
  multisampling = 8,
  aaType = "smaa",
  superSampling = 1
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      enabled,
      toneMappingExposure,
      multisampling,
      aaType,
      superSampling
    }),
    [enabled, toneMappingExposure, multisampling, aaType, superSampling]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkJ3ZUKSPFcjs.HighResPostProcessingPlugin)(), []);
  _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.HighResPostProcessing = HighResPostProcessing;
