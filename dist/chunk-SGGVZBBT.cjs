"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkRPBPPUIHcjs = require('./chunk-RPBPPUIH.cjs');


var _chunkSOHWGVSRcjs = require('./chunk-SOHWGVSR.cjs');


var _chunk4C6ASQ65cjs = require('./chunk-4C6ASQ65.cjs');

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
  const activeModel = _chunk4C6ASQ65cjs.useActiveModel.call(void 0, );
  const targetModel = _nullishCoalesce(customModel, () => ( activeModel));
  const handler = _react.useCallback.call(void 0, 
    (event) => {
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
      onClick,
      onHoverIn,
      onHoverOut,
      onHoverMove,
      onDragStart,
      onDrag,
      onDragEnd
    ]
  );
  const config = _react.useMemo.call(void 0, 
    () => ({
      model: _nullishCoalesce(targetModel, () => ( null)),
      onEvent: handler
    }),
    [targetModel, handler]
  );
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkSOHWGVSRcjs.AdvancedRaycasterPlugin)(null, void 0),
    []
  );
  _chunkRPBPPUIHcjs.usePlugin.call(void 0, factory, config);
  return null;
};



exports.AdvancedRaycaster = AdvancedRaycaster;
