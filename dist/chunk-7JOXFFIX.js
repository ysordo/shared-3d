import {
  isDev
} from "./chunk-RZGW4YCZ.js";

// src/core/cache/FileWatcher.ts
var FileWatcher = class _FileWatcher {
  static instance = null;
  watchers = /* @__PURE__ */ new Map();
  manifest = [];
  onChange;
  constructor() {
    if (!isDev()) {
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
    if (!isDev()) {
      return;
    }
    this.manifest = manifest;
    this.onChange = onChange;
    this.checkForChanges();
  }
  async checkForChanges() {
    if (!this.manifest.length || !isDev()) {
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
      } catch {
      }
    }
    if (changed.length > 0) {
      this.onChange?.(changed);
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
};

export {
  FileWatcher
};
