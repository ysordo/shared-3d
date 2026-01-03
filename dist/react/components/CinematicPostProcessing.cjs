"use strict";Object.defineProperty(exports, "__esModule", {value: true});"use client";


var _chunk5J475KONcjs = require('../../chunk-5J475KON.cjs');


var _chunkRLPJUVA4cjs = require('../../chunk-RLPJUVA4.cjs');
require('../../chunk-4RZWCRXE.cjs');
require('../../chunk-WAZQGQ6Z.cjs');
require('../../chunk-OS5KFCWO.cjs');
require('../../chunk-ISDKKMXI.cjs');
require('../../chunk-QPTSJCSB.cjs');
require('../../chunk-7W7IF4LU.cjs');
require('../../chunk-EA3XQ4KJ.cjs');
require('../../chunk-EZWJIGJ6.cjs');
require('../../chunk-EQHV3NLZ.cjs');
require('../../chunk-UW5RKAXQ.cjs');

// src/react/components/CinematicPostProcessing.tsx
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
  const factory = _react.useCallback.call(void 0, () => new (0, _chunk5J475KONcjs.CinematicPostProcessingPlugin)(), []);
  _chunkRLPJUVA4cjs.usePlugin.call(void 0, factory, config);
  return null;
};


exports.CinematicPostProcessing = CinematicPostProcessing;
