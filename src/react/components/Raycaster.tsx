/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import {
  RaycasterPlugin,
} from '../../core/orchestrator/plugins';
import type { THREE } from '../../lib';

type RaycasterProps = {
  onClick?: (obj: THREE.Object3D) => void;
  onHover?: (obj: THREE.Object3D) => void;
};

export const Raycaster: React.FC<RaycasterProps> = ({ onClick, onHover }) => {
  const orchestrator = useScene();

  useEffect(() => {
    const plugin = new RaycasterPlugin((event) => {
      if (event.type === 'click' && onClick) {
        onClick(event.object);
      }
      if (event.type === 'hover' && onHover) {
        onHover(event.object);
      }
    });
    orchestrator.use(plugin);
  }, [onClick, onHover]);

  return null;
};
