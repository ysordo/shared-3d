"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunk7YGHNVSEcjs = require('./chunk-7YGHNVSE.cjs');


var _chunk7WPOL7PKcjs = require('./chunk-7WPOL7PK.cjs');


var _chunkUW5RKAXQcjs = require('./chunk-UW5RKAXQ.cjs');

// src/core/cache/CacheValidator.ts
var _idbkeyval = require('idb-keyval');
var CacheValidator = (_class = class _CacheValidator {
  static __initStatic() {this.isFirstLoad = true}
  static async validate(options) {
    const { manifest, onProgress, onComplete, forceUpdate = false } = options;
    _optionalChain([onProgress, 'optionalCall', _ => _(0, "Iniciando validaci\xF3n de cach\xE9...")]);
    if (_chunk7WPOL7PKcjs.isDev.call(void 0, ) && !forceUpdate) {
      const watcher = _chunk7YGHNVSEcjs.FileWatcher.getInstance();
      watcher.watch(manifest, (changedIds) => {
        _optionalChain([onProgress, 'optionalCall', _2 => _2(100, `Recargando: ${changedIds.join(", ")}`)]);
        _optionalChain([onComplete, 'optionalCall', _3 => _3({
          validated: true,
          updated: changedIds,
          removed: [],
          added: [],
          errors: [],
          durationMs: 0
        })]);
      });
      _optionalChain([onProgress, 'optionalCall', _4 => _4(100, "Modo desarrollo: observando cambios...")]);
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }
    if (!_CacheValidator.isFirstLoad && !forceUpdate) {
      _optionalChain([onProgress, 'optionalCall', _5 => _5(100, "Cach\xE9 ya validada")]);
      return { validated: true, updated: [], removed: [], added: [], errors: [], durationMs: 0 };
    }
    _optionalChain([onProgress, 'optionalCall', _6 => _6(10, "Comparando manifest con cach\xE9 local...")]);
    const start = performance.now();
    const currentIds = new Set(manifest.map((m) => m.id));
    const cachedKeys = await _idbkeyval.keys.call(void 0, );
    const cachedIds = new Set(
      cachedKeys.filter((k) => typeof k === "string" && k.startsWith("shared-3d:asset:")).map((k) => k.replace("shared-3d:asset:", ""))
    );
    const removed = [];
    for (const id of cachedIds) {
      if (!currentIds.has(id)) {
        await _chunkUW5RKAXQcjs.ObjectCache.delete(id);
        removed.push(id);
      }
    }
    const toUpdate = [];
    for (const entry of manifest) {
      const cached = await _chunkUW5RKAXQcjs.ObjectCache.getMetadata(entry.id);
      if (!cached || cached.hash !== entry.hash || cached.updatedAt < entry.updatedAt) {
        toUpdate.push(entry);
      }
    }
    const report = {
      validated: true,
      updated: toUpdate.map((e) => e.id),
      removed,
      added: toUpdate.filter((e) => !cachedIds.has(e.id)).map((e) => e.id),
      errors: [],
      durationMs: Math.round(performance.now() - start)
    };
    _CacheValidator.isFirstLoad = false;
    _optionalChain([onProgress, 'optionalCall', _7 => _7(100, "Validaci\xF3n completa")]);
    _optionalChain([onComplete, 'optionalCall', _8 => _8(report)]);
    return report;
  }
  static reset() {
    _CacheValidator.isFirstLoad = true;
  }
}, _class.__initStatic(), _class);



exports.CacheValidator = CacheValidator;
