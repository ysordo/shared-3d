'use client';

import React, { forwardRef, useRef } from 'react';
import { SceneProvider } from '../../context/SceneContext';
import type { SceneConfig } from '../../core/orchestrator/SceneOrchestrator';

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  config?: SceneConfig;
  fallback?: React.ReactNode;
};

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ config, children, fallback = null, ...props }, ref) => {

    return (
      <>
        <SceneProvider ref={ref} config={config} fallback={fallback}>
          <canvas ref={ref} {...props} />
          {children}
        </SceneProvider>
      </>
    );
  }
);

Canvas.displayName = 'Canvas';
