"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk7T35AZSKcjs = require('./chunk-7T35AZSK.cjs');


var _chunkNXMNULHBcjs = require('./chunk-NXMNULHB.cjs');

// src/react/components/Raycaster.tsx
var _react = require('react');
var Raycaster = ({ onClick, onHover }) => {
  const orchestrator = _chunkNXMNULHBcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const plugin = new (0, _chunk7T35AZSKcjs.RaycasterPlugin)((event) => {
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
