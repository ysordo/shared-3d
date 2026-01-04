"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunkKJA7ZHNMcjs = require('./chunk-KJA7ZHNM.cjs');

// src/react/components/postprocessing/RealismPostProcessing.tsx
var _react = require('react');
var RealismPostProcessing = ({
  enabled = true,
  ssgiDistance = 10,
  ssgiThickness = 10,
  ssgiDenoiseIterations = 2,
  ssgiResolutionScale = 1,
  hbaoIntensity = 1,
  hbaoBias = 0.5,
  traaBlend = 0.8,
  motionBlurIntensity = 0.5,
  toneMappingExposure = 1
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      enabled,
      ssgi: {
        distance: ssgiDistance,
        thickness: ssgiThickness,
        denoiseIterations: ssgiDenoiseIterations,
        resolutionScale: ssgiResolutionScale
      },
      hbao: {
        intensity: hbaoIntensity,
        bias: hbaoBias
      },
      traa: {
        blend: traaBlend
      },
      motionBlur: {
        intensity: motionBlurIntensity
      },
      toneMappingExposure
    }),
    [
      enabled,
      ssgiDistance,
      ssgiThickness,
      ssgiDenoiseIterations,
      ssgiResolutionScale,
      hbaoIntensity,
      hbaoBias,
      traaBlend,
      motionBlurIntensity,
      toneMappingExposure
    ]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkKJA7ZHNMcjs.RealismPostProcessingPlugin)(), []);
  _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.RealismPostProcessing = RealismPostProcessing;
