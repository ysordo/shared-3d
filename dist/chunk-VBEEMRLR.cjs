"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunkNIVVR6XYcjs = require('./chunk-NIVVR6XY.cjs');

// src/react/components/postprocessing/RealisticPostProcessing.tsx
var _react = require('react');
var DEFAULT_REALISTIC_POST_PROCESSING = {
  enabled: true,
  bloomIntensity: 0.8,
  bloomLuminanceThreshold: 0.9,
  dofBokehScale: 0,
  dofFocusDistance: 0,
  dofFocalLength: 0.05,
  vignetteDarkness: 0,
  vignetteOffset: 0.5,
  noiseOpacity: 0.02,
  toneMappingExposure: 1
};
var RealisticPostProcessing = ({
  enabled,
  bloomIntensity,
  bloomLuminanceThreshold,
  dofBokehScale,
  dofFocusDistance,
  dofFocalLength,
  vignetteDarkness,
  vignetteOffset,
  noiseOpacity,
  toneMappingExposure
} = DEFAULT_REALISTIC_POST_PROCESSING) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      enabled,
      bloom: {
        intensity: bloomIntensity,
        luminanceThreshold: bloomLuminanceThreshold
      },
      dof: {
        bokehScale: dofBokehScale,
        focusDistance: dofFocusDistance,
        focalLength: dofFocalLength
      },
      vignette: { darkness: vignetteDarkness, offset: vignetteOffset },
      noise: { opacity: noiseOpacity },
      toneMappingExposure
    }),
    [
      enabled,
      bloomIntensity,
      bloomLuminanceThreshold,
      dofBokehScale,
      dofFocusDistance,
      dofFocalLength,
      vignetteDarkness,
      vignetteOffset,
      noiseOpacity,
      toneMappingExposure
    ]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkNIVVR6XYcjs.RealisticPostProcessingPlugin)(), []);
  _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, config);
  return null;
};
RealisticPostProcessing.defaultProps = DEFAULT_REALISTIC_POST_PROCESSING;
RealisticPostProcessing.displayName = "RealisticPostProcessing";



exports.RealisticPostProcessing = RealisticPostProcessing;
