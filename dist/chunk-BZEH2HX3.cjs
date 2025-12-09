"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkR3D4E7BRcjs = require('./chunk-R3D4E7BR.cjs');


var _chunkVUZQJRX4cjs = require('./chunk-VUZQJRX4.cjs');


var _chunkC7CPDDG7cjs = require('./chunk-C7CPDDG7.cjs');

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
  const orchestrator = _chunkC7CPDDG7cjs.useScene.call(void 0, );
  const activeModel = _chunkVUZQJRX4cjs.useActiveModel.call(void 0, );
  _react.useEffect.call(void 0, () => {
    const plugin = new (0, _chunkR3D4E7BRcjs.AdvancedRaycasterPlugin)(
      customModel || activeModel || void 0,
      (e) => {
        switch (e.type) {
          case "objectclick":
            _optionalChain([onClick, 'optionalCall', _ => _(e)]);
            break;
          case "objecthoverin":
            _optionalChain([onHoverIn, 'optionalCall', _2 => _2(e)]);
            break;
          case "objecthoverout":
            _optionalChain([onHoverOut, 'optionalCall', _3 => _3(e)]);
            break;
          case "objecthovermove":
            _optionalChain([onHoverMove, 'optionalCall', _4 => _4(e)]);
            break;
          case "objectdragstart":
            _optionalChain([onDragStart, 'optionalCall', _5 => _5(e)]);
            break;
          case "objectdrag":
            _optionalChain([onDrag, 'optionalCall', _6 => _6(e)]);
            break;
          case "objectdragend":
            _optionalChain([onDragEnd, 'optionalCall', _7 => _7(e)]);
            break;
        }
      }
    );
    orchestrator.use(plugin);
  }, [
    customModel,
    activeModel,
    onClick,
    onHoverIn,
    onHoverOut,
    onHoverMove,
    onDragStart,
    onDrag,
    onDragEnd
  ]);
  return null;
};



exports.AdvancedRaycaster = AdvancedRaycaster;
