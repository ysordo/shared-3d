'use client';

import { usePlugin } from '../../hooks/usePlugin';
import { OrbitControlsPlugin } from '../../core/orchestrator/plugins';
import { useCallback } from 'react';

export const OrbitControls: React.FC = () => {
  const factory = useCallback(()=>new OrbitControlsPlugin(),[]);
  usePlugin(factory, [factory]);
  return null;
};
