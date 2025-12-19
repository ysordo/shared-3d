"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkKH6H4E25cjs = require('./chunk-KH6H4E25.cjs');

// src/react/components/VRButton.tsx
var _react = require('react');
var _VRButtonjs = require('three/examples/jsm/webxr/VRButton.js');
var VRButton = () => {
  const orchestrator = _chunkKH6H4E25cjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator || !orchestrator.renderer) {
      return;
    }
    orchestrator.renderer.xr.enabled = true;
    const button = _VRButtonjs.VRButton.createButton(orchestrator.renderer);
    document.body.appendChild(button);
    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [orchestrator, _optionalChain([orchestrator, 'optionalAccess', _ => _.renderer])]);
  return null;
};



exports.VRButton = VRButton;
