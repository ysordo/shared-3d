'use client';
import type { ReactNode } from 'react';
import React, { Suspense as SuspenseReact } from 'react';

type SuspenseProps = {
  children: ReactNode;
  fallback?: ReactNode | undefined;
  loadingMessage?: string;
};

export const Suspense: React.FC<SuspenseProps> = ({
  children,
  fallback,
  loadingMessage = 'Loading 3D model...',
}) => {
  const defaultFallback = (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-gray-900/90 border border-gray-700 rounded-xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-white">{loadingMessage}</p>
        <p className="text-sm text-gray-400 mt-2">
          This may take a few seconds...
        </p>
      </div>
    </div>
  );

  return <SuspenseReact fallback={fallback || defaultFallback}>{children}</SuspenseReact>;
};
