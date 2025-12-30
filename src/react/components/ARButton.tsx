'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../hooks/useScene';
import { ARButton as ThreeARButton } from 'three/examples/jsm/webxr/ARButton.js';

export const ARButton: React.FC = () => {
  const { renderer } = useScene();

  useEffect(() => {
    if (!renderer) {
      return;
    }

    renderer.xr.enabled = true;
    const button = ThreeARButton.createButton(renderer);
    renderer.domElement.appendChild(button);

    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [renderer]);

  return null;
};
