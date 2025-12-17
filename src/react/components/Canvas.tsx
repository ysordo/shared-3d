'use client';
import type { ReactNode } from 'react';
import React, { useRef } from 'react';
import { SceneProvider } from '../../context/SceneContext';
import type { SceneConfig } from '../../core/orchestrator/SceneOrchestrator';

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  config?: SceneConfig;
  children?: ReactNode;
};

export const Canvas: React.FC<CanvasProps> = ({
  config,
  children,
  ...canvasProps
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  return (
    <>
      <canvas ref={ref} {...canvasProps} />
      <SceneProvider ref={ref} config={config}>
        {children}
      </SceneProvider>
    </>
  );
};

Canvas.displayName = 'Canvas';
