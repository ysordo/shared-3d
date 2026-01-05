"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunk36UEN36Rcjs = require('./chunk-36UEN36R.cjs');

// src/react/components/postprocessing/UnrealEnginePostProcessing.tsx
var _react = require('react');
var UnrealEnginePostProcessing = ({
  enabled = true,
  bloomIntensity = 0.5,
  motionBlurIntensity = 0.4,
  taaBlend = 0.9,
  sharpenStrength = 0.2,
  toneMappingExposure = 1.1
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      enabled,
      bloom: { intensity: bloomIntensity },
      motionBlur: { intensity: motionBlurIntensity },
      taa: { blend: taaBlend },
      sharpen: { strength: sharpenStrength },
      toneMappingExposure
    }),
    [
      enabled,
      bloomIntensity,
      motionBlurIntensity,
      taaBlend,
      sharpenStrength,
      toneMappingExposure
    ]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunk36UEN36Rcjs.UnrealEnginePostProcessingPlugin)(), []);
  _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.UnrealEnginePostProcessing = UnrealEnginePostProcessing;
