"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkZYLKJTVScjs = require('./chunk-ZYLKJTVS.cjs');

// src/react/components/Raycaster.tsx
var _react = require('react');
var Raycaster = ({
  enabled = true,
  objects,
  onClick,
  onHover
}) => {
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
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkZYLKJTVScjs.RaycasterPlugin)({ enabled, objects, onEvent: handle }),
    [enabled, objects, handle]
  );
  const plugin = _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, []);
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _ => _.update, 'call', _2 => _2({ enabled, objects, onEvent: handle })]);
  }, [enabled, objects, handle, plugin]);
  return null;
};



exports.Raycaster = Raycaster;
