"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkDLJXBVOIcjs = require('./chunk-DLJXBVOI.cjs');


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
  const deps = _react.useMemo.call(void 0, () => [handle], [handle]);
  _chunkDLJXBVOIcjs.usePlugin.call(void 0, new (0, _chunkFH6APZUOcjs.RaycasterPlugin)(handle), deps);
  return null;
};



exports.Raycaster = Raycaster;
