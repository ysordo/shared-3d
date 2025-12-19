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
    const internalRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = (ref ??
      internalRef) as React.RefObject<HTMLCanvasElement | null>;

    return (
      <>
        <SceneProvider
          ref={canvasRef}
          config={config}
          Canvas={forwardRef<
            HTMLCanvasElement,
            React.CanvasHTMLAttributes<HTMLCanvasElement>
          >((canvasProps, canvasRefFromForward) => {
            canvasProps = {...canvasProps, ...props};
            return <canvas ref={canvasRefFromForward} {...canvasProps} />;
          })}
          fallback={fallback}>
          {children}
        </SceneProvider>
      </>
    );
  }
);

Canvas.displayName = 'Canvas';
