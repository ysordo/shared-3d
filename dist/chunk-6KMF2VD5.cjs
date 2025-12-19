"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3M257MS7cjs = require('./chunk-3M257MS7.cjs');


var _chunkL3KVNMIIcjs = require('./chunk-L3KVNMII.cjs');


var _chunkFH6APZUOcjs = require('./chunk-FH6APZUO.cjs');

// src/react/components/Raycaster.tsx
var _react = require('react');
var Raycaster = ({ onClick, onHover }) => {
  const orchestrator = _chunkL3KVNMIIcjs.useScene.call(void 0, );
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
  const config = _react.useMemo.call(void 0, () => handle, [handle]);
  const deps = _react.useMemo.call(void 0, () => [handle], [handle]);
  _chunk3M257MS7cjs.usePlugin.call(void 0, new (0, _chunkFH6APZUOcjs.RaycasterPlugin)(config), deps);
  return null;
};



exports.Raycaster = Raycaster;
