"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3M257MS7cjs = require('./chunk-3M257MS7.cjs');


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
  _chunk3M257MS7cjs.usePlugin.call(void 0, new (0, _chunk2LFFYOLBcjs.AutoLODSystemPlugin)(config), deps);
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
