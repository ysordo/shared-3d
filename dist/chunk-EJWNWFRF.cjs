"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkA42KOQBFcjs = require('./chunk-A42KOQBF.cjs');


var _chunk5C4PNMUPcjs = require('./chunk-5C4PNMUP.cjs');

// src/react/components/AutoLODSystem.tsx
var _react = require('react');
var AutoLODSystem = ({
  mediumDistance = 20,
  lowDistance = 50,
  hideDistance = 100
}) => {
  const orchestrator = _chunk5C4PNMUPcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    orchestrator.use(new (0, _chunkA42KOQBFcjs.AutoLODSystemPlugin)({
      distances: [mediumDistance, lowDistance, hideDistance]
    }));
    return () => {
      _optionalChain([orchestrator, 'access', _ => _.plugin, 'call', _2 => _2("AutoLODSystem"), 'access', _3 => _3.dispose, 'optionalCall', _4 => _4()]);
    };
  }, [mediumDistance, lowDistance, hideDistance]);
  return null;
};



exports.AutoLODSystem = AutoLODSystem;
