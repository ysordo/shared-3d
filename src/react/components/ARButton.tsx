'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { ARButton as ThreeARButton } from 'three/examples/jsm/webxr/ARButton.js';

export const ARButton: React.FC = () => {
  const orchestrator = useScene();

  useEffect(() => {
    if (!orchestrator || !orchestrator.renderer) {
      return;
    }

    orchestrator.renderer.xr.enabled = true;
    const button = ThreeARButton.createButton(orchestrator.renderer);
    document.body.appendChild(button);

    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [orchestrator, orchestrator?.renderer]);

  return null;
};
