'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { VRButton as ThreeVRButton } from 'three/examples/jsm/webxr/VRButton.js';

export const VRButton: React.FC = () => {
  const orchestrator = useScene();

  useEffect(() => {
    if (!orchestrator || !orchestrator.renderer) {
      return;
    }

    orchestrator.renderer.xr.enabled = true;
    const button = ThreeVRButton.createButton(orchestrator.renderer);
    document.body.appendChild(button);

    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [orchestrator, orchestrator?.renderer]);

  return null;
};
