'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { CacheValidator } from '../../core/cache/CacheValidator';
import type { ManifestEntries, CacheReport } from '../../core/cache/types';

type CacheStatus = 'idle' | 'validating' | 'ready' | 'error';

type CacheContextValue = {
  status: CacheStatus;
  progress: number;
  report: CacheReport | null;
  validate: (manifest: ManifestEntries) => Promise<CacheReport>;
};

const CacheContext = createContext<CacheContextValue | null>(null);

export const CacheProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<CacheStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<CacheReport | null>(null);

  const validate = async (manifest: ManifestEntries): Promise<CacheReport> => {
    setStatus('validating');
    setProgress(0);

    const result = await CacheValidator.validate({
      manifest,
      onProgress: (p) => setProgress(Math.round(p)),
      onComplete: (r) => {
        setReport(r);
        setStatus(r.errors.length > 0 ? 'error' : 'ready');
      },
    });

    return result;
  };

  const value = useMemo(
    () => ({ status, progress, report, validate }),
    [status, progress, report]
  );

  return (
    <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
  );
};

export const useCache = (): CacheContextValue => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache debe usarse dentro de <CacheProvider>');
  }
  return context;
};