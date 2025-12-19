"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkHWEQELQ6cjs = require('./chunk-HWEQELQ6.cjs');


var _chunk2LFFYOLBcjs = require('./chunk-2LFFYOLB.cjs');

// src/react/components/AutoLODSystem.tsx
var _react = require('react');
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100,
  enabled = true
}) => {
  const config = _react.useMemo.call(void 0, 
    () => ({
      distances: [mediumDistance, lowDistance, hideDistance]
    }),
    [mediumDistance, lowDistance, hideDistance]
  );
  const deps = _react.useMemo.call(void 0, 
    () => [...Object.values(config), enabled],
    [...Object.values(config), enabled]
  );
  _chunkHWEQELQ6cjs.usePlugin.call(void 0, "AutoLODSystem", () => new (0, _chunk2LFFYOLBcjs.AutoLODSystemPlugin)(config), deps);
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
