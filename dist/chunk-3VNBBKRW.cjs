"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkHIHVQAZZcjs = require('./chunk-HIHVQAZZ.cjs');


var _chunk5KIFVYNZcjs = require('./chunk-5KIFVYNZ.cjs');

// src/react/components/AutoLODSystem.tsx
var _react = require('react');
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100
}) => {
  const orchestrator = _chunkHIHVQAZZcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    if (orchestrator.has("AutoLODSystem")) {
      return;
    }
    orchestrator.use(
      new (0, _chunk5KIFVYNZcjs.AutoLODSystemPlugin)({
        distances: [mediumDistance, lowDistance, hideDistance]
      })
    );
    return () => {
      _optionalChain([orchestrator, 'access', _ => _.plugin, 'call', _2 => _2("AutoLODSystem"), 'access', _3 => _3.dispose, 'optionalCall', _4 => _4()]);
      orchestrator.remove("AutoLODSystem");
    };
  }, [orchestrator]);
  _react.useEffect.call(void 0, () => {
    if (orchestrator.has("AutoLODSystem")) {
      orchestrator.remove("AutoLODSystem");
    }
    orchestrator.use(
      new (0, _chunk5KIFVYNZcjs.AutoLODSystemPlugin)({
        distances: [mediumDistance, lowDistance, hideDistance]
      })
    );
  }, [mediumDistance, lowDistance, hideDistance]);
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
