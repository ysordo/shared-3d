'use client';

import { useCallback, useEffect } from 'react';
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
  const factory = useCallback(
    () => new PostProcessingPlugin({ enabled, bloom }),
    [enabled, bloom]
  );
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update({ enabled, bloom });
  }, [enabled, bloom, plugin]);

  if (!enabled) {
    return null;
  }

  return null;
};
