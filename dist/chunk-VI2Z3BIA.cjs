"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/core/cache/utils/env.ts
var isDev = () => {
  if (_optionalChain([import.meta, 'access', _ => _.env, 'optionalAccess', _2 => _2.MODE])) {
    return _optionalChain([import.meta, 'access', _3 => _3.env, 'optionalAccess', _4 => _4.MODE]) === "development";
  }
  if (_optionalChain([process, 'optionalAccess', _5 => _5.env, 'optionalAccess', _6 => _6.NODE_ENV])) {
    return _optionalChain([process, 'access', _7 => _7.env, 'optionalAccess', _8 => _8.NODE_ENV]) === "development";
  }
  return false;
};
var isProduction = () => !isDev();




exports.isDev = isDev; exports.isProduction = isProduction;
