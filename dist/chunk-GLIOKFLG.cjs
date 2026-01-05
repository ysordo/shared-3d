"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunkNIVVR6XYcjs = require('./chunk-NIVVR6XY.cjs');

// src/react/components/postprocessing/RealisticPostProcessing.tsx
var _react = require('react');
var RealisticPostProcessing = ({
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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkNIVVR6XYcjs.RealisticPostProcessingPlugin)(), []);
  _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.RealisticPostProcessing = RealisticPostProcessing;
