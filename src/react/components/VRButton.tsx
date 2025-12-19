'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { VRButton as ThreeVRButton } from 'three/examples/jsm/webxr/VRButton.js';

export const VRButton: React.FC = () => {
  const {renderer} = useScene();

  useEffect(() => {
    if (!renderer) {
      return;
    }

    renderer.xr.enabled = true;
    const button = ThreeVRButton.createButton(renderer);
    renderer.domElement.appendChild(button);

    return () => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [renderer]);

  return null;
};
