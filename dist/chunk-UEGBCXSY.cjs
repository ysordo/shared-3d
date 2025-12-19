"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkULL3GOZJcjs = require('./chunk-ULL3GOZJ.cjs');

// src/react/components/ARButton.tsx
var _react = require('react');
var _ARButtonjs = require('three/examples/jsm/webxr/ARButton.js');
var ARButton = () => {
  const orchestrator = _chunkULL3GOZJcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator || !orchestrator.renderer) {
      return;
    }
    orchestrator.renderer.xr.enabled = true;
    const button = _ARButtonjs.ARButton.createButton(orchestrator.renderer);
    document.body.appendChild(button);
    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [orchestrator, _optionalChain([orchestrator, 'optionalAccess', _ => _.renderer])]);
  return null;
};



exports.ARButton = ARButton;
