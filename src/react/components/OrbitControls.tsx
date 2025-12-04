'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { OrbitControlsPlugin } from '../../core/orchestrator/plugins';

export const OrbitControls: React.FC = () => {
  const orchestrator = useScene();

  useEffect(() => {
    if(!orchestrator) {return;}
    orchestrator.use(new OrbitControlsPlugin());
  }, [orchestrator]);

  return null;
};
