"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk5DEHJDNUcjs = require('./chunk-5DEHJDNU.cjs');


var _chunkFH6APZUOcjs = require('./chunk-FH6APZUO.cjs');

// src/react/components/Raycaster.tsx
var _react = require('react');
var Raycaster = ({ onClick, onHover }) => {
  const orchestrator = _chunk5DEHJDNUcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    const plugin = new (0, _chunkFH6APZUOcjs.RaycasterPlugin)((event) => {
      if (event.type === "click" && onClick) {
        onClick(event.object);
      }
      if (event.type === "hover" && onHover) {
        onHover(event.object);
      }
    });
    orchestrator.use(plugin);
  }, [orchestrator, onClick, onHover]);
  return null;
};



exports.Raycaster = Raycaster;
