'use client';

import { usePlugin } from '../../hooks/usePlugin';
import { OrbitControlsPlugin } from '../../core/orchestrator/plugins';

export const OrbitControls: React.FC = () => {
  usePlugin(new OrbitControlsPlugin(), []);
  return null;
};
