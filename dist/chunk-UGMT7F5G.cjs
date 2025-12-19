"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkNFCEFR2Qcjs = require('./chunk-NFCEFR2Q.cjs');


var _chunkFH6APZUOcjs = require('./chunk-FH6APZUO.cjs');

// src/react/components/Raycaster.tsx
var _react = require('react');
var Raycaster = ({ onClick, onHover }) => {
  const handle = _react.useCallback.call(void 0, 
    (event) => {
      if (event.type === "click" && onClick) {
        onClick(event.object);
      }
      if (event.type === "hover" && onHover) {
        onHover(event.object);
      }
    },
    [onClick, onHover]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkFH6APZUOcjs.RaycasterPlugin)(handle), [handle]);
  _chunkNFCEFR2Qcjs.usePlugin.call(void 0, factory, [factory]);
  return null;
};



exports.Raycaster = Raycaster;
