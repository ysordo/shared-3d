"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkHBD5STTQcjs = require('./chunk-HBD5STTQ.cjs');


var _chunkBS6FGAC2cjs = require('./chunk-BS6FGAC2.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/AdvancedRaycaster.tsx
var _react = require('react');
var AdvancedRaycaster = ({
  model: customModel,
  onClick,
  onHoverIn,
  onHoverOut,
  onHoverMove,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const activeModel = _chunkBS6FGAC2cjs.useActiveModel.call(void 0, );
  const targetModel = _nullishCoalesce(customModel, () => ( activeModel));
  const handler = _react.useCallback.call(void 0, 
    (event) => {
      if (!targetModel) {
        return;
      }
      switch (event.type) {
        case "objectclick":
          _optionalChain([onClick, 'optionalCall', _ => _(event)]);
          break;
        case "objecthoverin":
          _optionalChain([onHoverIn, 'optionalCall', _2 => _2(event)]);
          break;
        case "objecthoverout":
          _optionalChain([onHoverOut, 'optionalCall', _3 => _3(event)]);
          break;
        case "objecthovermove":
          _optionalChain([onHoverMove, 'optionalCall', _4 => _4(event)]);
          break;
        case "objectdragstart":
          _optionalChain([onDragStart, 'optionalCall', _5 => _5(event)]);
          break;
        case "objectdrag":
          _optionalChain([onDrag, 'optionalCall', _6 => _6(event)]);
          break;
        case "objectdragend":
          _optionalChain([onDragEnd, 'optionalCall', _7 => _7(event)]);
          break;
      }
    },
    [
      targetModel,
      // Incluido para reactividad si cambia
      onClick,
      onHoverIn,
      onHoverOut,
      onHoverMove,
      onDragStart,
      onDrag,
      onDragEnd
    ]
  );
  const factory = _react.useCallback.call(void 0, () => {
    if (!targetModel) {
      return new (0, _chunkHBD5STTQcjs.AdvancedRaycasterPlugin)(new _chunkEA3XQ4KJcjs.THREE.Object3D(), () => {
      });
    }
    return new (0, _chunkHBD5STTQcjs.AdvancedRaycasterPlugin)(targetModel, handler);
  }, []);
  const plugin = _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, [targetModel, handler]);
  _react.useEffect.call(void 0, () => {
    if (targetModel) {
      _optionalChain([plugin, 'optionalAccess', _8 => _8.update, 'call', _9 => _9(targetModel, handler)]);
    }
  }, [targetModel, handler, plugin]);
  if (!targetModel) {
    return null;
  }
  return null;
};



exports.AdvancedRaycaster = AdvancedRaycaster;
