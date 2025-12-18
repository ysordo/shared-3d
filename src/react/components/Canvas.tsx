'use client';

import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { SceneProvider } from '../../context/SceneContext';
import type { SceneConfig } from '../../core/orchestrator/SceneOrchestrator';

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  config?: SceneConfig;
  children?: ReactNode;
};

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ config, children, ...canvasProps }, ref) => {
    return (
      <SceneProvider config={config} ref={ref} {...canvasProps}>
        {children}
      </SceneProvider>
    );
  }
);

Canvas.displayName = 'Canvas';