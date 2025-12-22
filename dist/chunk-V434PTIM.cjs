"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkZKG3D4LTcjs = require('./chunk-ZKG3D4LT.cjs');


var _chunkZHLNOXCWcjs = require('./chunk-ZHLNOXCW.cjs');

// src/react/components/Raycaster.tsx
var _react = require('react');
var Raycaster = ({
  enabled = true,
  objects,
  onClick,
  onHover
}) => {
  const handleEvent = _react.useCallback.call(void 0, 
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
  const config = _react.useMemo.call(void 0, 
    () => ({
      enabled,
      objects: _nullishCoalesce(objects, () => ( void 0)),
      onEvent: handleEvent
    }),
    [enabled, objects, handleEvent]
  );
  const factory = _react.useCallback.call(void 0, () => new (0, _chunkZHLNOXCWcjs.RaycasterPlugin)(), []);
  _chunkZKG3D4LTcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.Raycaster = Raycaster;
