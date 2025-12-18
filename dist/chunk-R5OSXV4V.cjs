"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkXRNKCSHRcjs = require('./chunk-XRNKCSHR.cjs');

// src/hooks/useScene.ts
var useScene = () => _nullishCoalesce(_optionalChain([_chunkXRNKCSHRcjs.useSceneContext.call(void 0, ), 'optionalAccess', _ => _.orchestrator]), () => ( null));



exports.useScene = useScene;
