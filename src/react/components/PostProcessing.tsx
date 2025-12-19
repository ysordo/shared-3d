'use client';

import { useCallback } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { PostProcessingPlugin } from '../../core/orchestrator/plugins';

type PostProcessingProps = {
  bloom?: {
    strength: number;
    radius: number;
    threshold: number;
  };
  enabled?: boolean;
};

export const PostProcessing: React.FC<PostProcessingProps> = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true,
}) => {
  const factory = useCallback(() => new PostProcessingPlugin(bloom), [bloom]);
  usePlugin(factory, enabled ? [bloom] : ['disabled']);

  if (!enabled) {
    return null;
  }

  return null;
};
