import { isDev } from './utils/env';
export class FileWatcher {
    static instance = null;
    watchers = new Map();
    manifest = [];
    onChange;
    constructor() {
        if (!isDev()) {
            return;
        }
        this.startPolling();
    }
    static getInstance() {
        if (!FileWatcher.instance) {
            FileWatcher.instance = new FileWatcher();
        }
        return FileWatcher.instance;
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
                    method: 'HEAD',
                    cache: 'no-store'
                });
                const lastModified = response.headers.get('Last-Modified');
                const etag = response.headers.get('ETag');
                let currentStamp;
                if (lastModified) {
                    const parsed = Date.parse(lastModified);
                    currentStamp = isNaN(parsed) ? Date.now() : parsed;
                }
                else if (etag) {
                    // Convertir ETag a número reproducible
                    const clean = etag.replace(/^W\//, '').replace(/"/g, '');
                    let hash = 0;
                    for (let i = 0; i < clean.length; i++) {
                        hash = ((hash << 5) - hash) + clean.charCodeAt(i);
                        hash = hash & hash;
                    }
                    currentStamp = hash;
                }
                else {
                    currentStamp = Date.now();
                }
                const previousStamp = this.watchers.get(entry.url);
                if (previousStamp !== undefined && previousStamp !== currentStamp) {
                    changed.push(entry.id);
                }
                this.watchers.set(entry.url, currentStamp);
            }
            catch {
                // Silencioso en dev
            }
        }
        if (changed.length > 0) {
            this.onChange?.(changed);
        }
    }
    startPolling() {
        setInterval(() => this.checkForChanges(), 2000);
    }
    dispose() {
        this.watchers.clear();
        this.onChange = (() => { });
    }
}
//# sourceMappingURL=FileWatcher.js.map