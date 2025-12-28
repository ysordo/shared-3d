"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;

var _chunkVI2Z3BIAcjs = require('./chunk-VI2Z3BIA.cjs');

// src/core/cache/FileWatcher.ts
var FileWatcher = (_class = class _FileWatcher {
  static __initStatic() {this.instance = null}
  __init() {this.watchers = /* @__PURE__ */ new Map()}
  __init2() {this.manifest = []}
  
  constructor() {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    if (!_chunkVI2Z3BIAcjs.isDev.call(void 0, )) {
      return;
    }
    this.startPolling();
  }
  static getInstance() {
    if (!_FileWatcher.instance) {
      _FileWatcher.instance = new _FileWatcher();
    }
    return _FileWatcher.instance;
  }
  watch(manifest, onChange) {
    if (!_chunkVI2Z3BIAcjs.isDev.call(void 0, )) {
      return;
    }
    this.manifest = manifest;
    this.onChange = onChange;
    this.checkForChanges();
  }
  async checkForChanges() {
    if (!this.manifest.length || !_chunkVI2Z3BIAcjs.isDev.call(void 0, )) {
      return;
    }
    const changed = [];
    for (const entry of this.manifest) {
      try {
        const response = await fetch(entry.url, {
          method: "HEAD",
          cache: "no-store"
        });
        const lastModified = response.headers.get("Last-Modified");
        const etag = response.headers.get("ETag");
        let currentStamp;
        if (lastModified) {
          const parsed = Date.parse(lastModified);
          currentStamp = isNaN(parsed) ? Date.now() : parsed;
        } else if (etag) {
          const clean = etag.replace(/^W\//, "").replace(/"/g, "");
          let hash = 0;
          for (let i = 0; i < clean.length; i++) {
            hash = (hash << 5) - hash + clean.charCodeAt(i);
            hash = hash & hash;
          }
          currentStamp = hash;
        } else {
          currentStamp = Date.now();
        }
        const previousStamp = this.watchers.get(entry.url);
        if (previousStamp !== void 0 && previousStamp !== currentStamp) {
          changed.push(entry.id);
        }
        this.watchers.set(entry.url, currentStamp);
      } catch (e) {
      }
    }
    if (changed.length > 0) {
      _optionalChain([this, 'access', _ => _.onChange, 'optionalCall', _2 => _2(changed)]);
    }
  }
  startPolling() {
    setInterval(() => this.checkForChanges(), 2e3);
  }
  dispose() {
    this.watchers.clear();
    this.onChange = (() => {
    });
  }
}, _class.__initStatic(), _class);



exports.FileWatcher = FileWatcher;
