"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkJ7M3GXH6cjs = require('./chunk-J7M3GXH6.cjs');


var _chunkMMMO3SNVcjs = require('./chunk-MMMO3SNV.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({ enabled = true, ...config }) => {
  const orchestrator = _chunkJ7M3GXH6cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!enabled || !orchestrator || !orchestrator.getActiveModel()) {
      return;
    }
    if (orchestrator.has("AdvancedCameraCollision")) {
      return;
    }
    orchestrator.use(
      new (0, _chunkMMMO3SNVcjs.AdvancedCameraCollisionPlugin)(...Object.values(config))
    );
    return () => {
      _optionalChain([orchestrator, 'access', _ => _.plugin, 'call', _2 => _2("AdvancedCameraCollision"), 'access', _3 => _3.dispose, 'optionalCall', _4 => _4()]);
      orchestrator.remove("AdvancedCameraCollision");
    };
  }, [config, orchestrator, orchestrator.getActiveModel()]);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
