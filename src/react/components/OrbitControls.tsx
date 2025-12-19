'use client';

import { usePlugin } from '../../hooks/usePlugin';
import { OrbitControlsPlugin } from '../../core/orchestrator/plugins/OrbitControlsPlugin';

export const OrbitControls: React.FC = () => {
  usePlugin(() => new OrbitControlsPlugin(), []);
  return null;
};