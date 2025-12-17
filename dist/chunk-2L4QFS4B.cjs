"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkMEH4EQN5cjs = require('./chunk-MEH4EQN5.cjs');


var _chunkFH6APZUOcjs = require('./chunk-FH6APZUO.cjs');

// src/react/components/Raycaster.tsx
var _react = require('react');
var Raycaster = ({ onClick, onHover }) => {
  const orchestrator = _chunkMEH4EQN5cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const plugin = new (0, _chunkFH6APZUOcjs.RaycasterPlugin)((event) => {
      if (event.type === "click" && onClick) {
        onClick(event.object);
      }
      if (event.type === "hover" && onHover) {
        onHover(event.object);
      }
    });
    orchestrator.use(plugin);
  }, [onClick, onHover]);
  return null;
};



exports.Raycaster = Raycaster;
