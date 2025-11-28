import type { ModelManifestEntry } from './types';
import { isDev } from './utils/env';

/**
 * Solo se usa en desarrollo (Vite, Webpack, Next.js, etc.)
 * Detecta cambios en archivos .glb/.gltf/.hdr y fuerza recarga del modelo
 */
export class FileWatcher {
  private static instance: FileWatcher | null = null;
  private watchers = new Map<string, number>();
  private manifest: ModelManifestEntry[] = [];
  private onChange?: (changedIds: string[]) => void;

  private constructor() {
    if (!isDev()) {return;}

    this.startPolling();
  }

  static getInstance(): FileWatcher {
    if (!FileWatcher.instance) {
      FileWatcher.instance = new FileWatcher();
    }
    return FileWatcher.instance;
  }

  public watch(manifest: ModelManifestEntry[], onChange: (ids: string[]) => void) {
    if (!isDev()) {return;}

    this.manifest = manifest;
    this.onChange = onChange;
    this.checkForChanges();
  }

  private async checkForChanges() {
    if (!this.manifest.length || !isDev()) {return;}

    const changed: string[] = [];

    for (const entry of this.manifest) {
        try {
        const response = await fetch(entry.url, { 
            method: 'HEAD', 
            cache: 'no-store' 
        });

        const lastModified = response.headers.get('Last-Modified');
        const etag = response.headers.get('ETag');

        let currentStamp: number;

        if (lastModified) {
            const parsed = Date.parse(lastModified);
            currentStamp = isNaN(parsed) ? Date.now() : parsed;
        } else if (etag) {
            currentStamp = this.etagToNumber(etag);
        } else {
            currentStamp = Date.now();
        }

        const previousStamp = this.watchers.get(entry.url);

        if (previousStamp !== undefined && previousStamp !== currentStamp) {
            changed.push(entry.id);
        }

        this.watchers.set(entry.url, currentStamp);
        } catch { }
    }

    if (changed.length > 0) {
        this.onChange?.(changed);
    }
    }

    private etagToNumber(etag: string): number {
    const clean = etag.replace(/^W\//, '').replace(/"/g, '');
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
        const char = clean.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
    }

  private startPolling() {
    setInterval(() => this.checkForChanges(), 2000);
  }

  public dispose() {
    this.watchers.clear();
    this.onChange = (()=>{});
  }
}