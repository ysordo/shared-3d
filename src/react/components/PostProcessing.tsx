'use client';

import { useMemo } from 'react';
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
  const deps = useMemo(
    () => [bloom.strength, bloom.radius, bloom.threshold, enabled],
    [bloom.strength, bloom.radius, bloom.threshold, enabled]
  );
  usePlugin(
    new PostProcessingPlugin(bloom),
    deps
  );

  if (!enabled) {
    return null;
  }

  return null;
};
