"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunkSWYK3VHKcjs = require('./chunk-SWYK3VHK.cjs');

// src/react/components/postprocessing/CinematicPostProcessing.tsx
var _react = require('react');
var CinematicPostProcessing = ({
  enabled = true,
  toneMappingExposure = 1,
  vignetteDarkness = 1.2,
  vignetteOffset = 1.6,
  filmGrainIntensity = 0.05,
  antiAlias = true
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      enabled,
      toneMappingExposure,
      vignette: {
        darkness: vignetteDarkness,
        offset: vignetteOffset
      },
      filmGrain: {
        intensity: filmGrainIntensity
      },
      antiAlias
    }),
    [
      enabled,
      toneMappingExposure,
      vignetteDarkness,
      vignetteOffset,
      filmGrainIntensity,
      antiAlias
    ]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkSWYK3VHKcjs.CinematicPostProcessingPlugin)(), []);
  _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.CinematicPostProcessing = CinematicPostProcessing;
