'use client';

import React, { forwardRef, useRef } from 'react';
import { SceneProvider } from '../../context/SceneContext';
import type { SceneConfig } from '../../core/orchestrator/SceneOrchestrator';

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  config?: SceneConfig;
};

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ config, children, ...props }, ref) => {
    const internalRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = (ref ??
      internalRef) as React.RefObject<HTMLCanvasElement | null>;

    return (
      <>
        <canvas ref={canvasRef} {...props} />
        <SceneProvider canvasRef={canvasRef} config={config}>
          {children}
        </SceneProvider>
      </>
    );
  }
);

Canvas.displayName = 'Canvas';
