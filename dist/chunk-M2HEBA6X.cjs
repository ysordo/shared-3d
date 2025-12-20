"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkQRKMF3WAcjs = require('./chunk-QRKMF3WA.cjs');

// src/react/components/AdvancedCameraCollision.tsx
var _react = require('react');
var AdvancedCameraCollision = ({
  distanceThreshold = 0.6,
  pushBackOffset = 0.1,
  smooth = 0.1,
  enabled = true
}) => {
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkQRKMF3WAcjs.AdvancedCameraCollisionPlugin)(
      distanceThreshold,
      pushBackOffset,
      smooth
    ),
    [distanceThreshold, pushBackOffset, smooth]
  );
  const plugin = _chunkN4YA2OBNcjs.usePlugin.call(void 0, 
    factory,
    []
  );
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _ => _.update, 'call', _2 => _2(distanceThreshold, pushBackOffset, smooth)]);
  }, [distanceThreshold, pushBackOffset, smooth, plugin]);
  return null;
};



exports.AdvancedCameraCollision = AdvancedCameraCollision;
