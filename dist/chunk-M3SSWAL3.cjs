"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk2N3CMCMJcjs = require('./chunk-2N3CMCMJ.cjs');

// src/react/components/ModelPreload.tsx
var _react = require('react');
var ModelPreload = ({
  entries,
  draco = false
}) => {
  _react.useEffect.call(void 0, () => {
    entries.forEach((entry) => {
      _chunk2N3CMCMJcjs.GLTFLoader.load(entry, { draco }).catch(() => {
      });
    });
  }, [entries, draco]);
  return null;
};



exports.ModelPreload = ModelPreload;
