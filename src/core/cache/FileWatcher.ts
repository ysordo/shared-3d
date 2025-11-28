import type { ManifestEntry } from './types';
import { isDev } from './utils/env';

export class FileWatcher {
  private static instance: FileWatcher | null = null;
  private watchers = new Map<string, number>();
  private manifest: ManifestEntry[] = [];
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

  public watch(manifest: ManifestEntry[], onChange: (ids: string[]) => void) {
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
          // Convertir ETag a número reproducible
          const clean = etag.replace(/^W\//, '').replace(/"/g, '');
          let hash = 0;
          for (let i = 0; i < clean.length; i++) {
            hash = ((hash << 5) - hash) + clean.charCodeAt(i);
            hash = hash & hash;
          }
          currentStamp = hash;
        } else {
          currentStamp = Date.now();
        }

        const previousStamp = this.watchers.get(entry.url);

        if (previousStamp !== undefined && previousStamp !== currentStamp) {
          changed.push(entry.id);
        }

        this.watchers.set(entry.url, currentStamp);
      } catch {
        // Silencioso en dev
      }
    }

    if (changed.length > 0) {
      this.onChange?.(changed);
    }
  }

  private startPolling() {
    setInterval(() => this.checkForChanges(), 2000);
  }

  public dispose() {
    this.watchers.clear();
    this.onChange = (()=>{});
  }
}