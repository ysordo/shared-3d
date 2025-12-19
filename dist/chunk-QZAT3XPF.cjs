"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkHLDF5CTLcjs = require('./chunk-HLDF5CTL.cjs');


var _chunkHPHYHDPRcjs = require('./chunk-HPHYHDPR.cjs');


var _chunkO2SNTQXCcjs = require('./chunk-O2SNTQXC.cjs');

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
  const activeModel = _chunkO2SNTQXCcjs.useActiveModel.call(void 0, );
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
  const deps = _react.useMemo.call(void 0, () => [targetModel, handler], [targetModel, handler]);
  _chunkHLDF5CTLcjs.usePlugin.call(void 0, 
    () => new (0, _chunkHPHYHDPRcjs.AdvancedRaycasterPlugin)(targetModel, handler),
    [...deps]
  );
  return null;
};



exports.AdvancedRaycaster = AdvancedRaycaster;
