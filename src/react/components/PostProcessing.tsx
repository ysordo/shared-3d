'use client';

import { useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { PostProcessingPlugin } from '../../core/orchestrator/plugins';

type PostProcessingProps = {
  bloom?: {
    strength?: number;
    radius?: number;
    threshold?: number;
  };
  enabled?: boolean;
};

export const PostProcessing: React.FC<PostProcessingProps> = ({
  bloom = { strength: 1.5, radius: 0.4, threshold: 0 },
  enabled = true,
}) => {
  const options = useMemo(
    () => bloom,
    [bloom.strength, bloom.radius, bloom.threshold]
  );

  usePlugin(
    () => new PostProcessingPlugin(options as any),
    enabled ? [options] : []
  );

  if (!enabled) {
    return null;
  }

  return null;
};
