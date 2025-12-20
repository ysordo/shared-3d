'use client';

import { useCallback, useEffect } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { PostProcessingPlugin } from '../../core/orchestrator/plugins';

type PostProcessingProps = {
  strength?: number;
  radius?: number;
  threshold?: number;
  enabled?: boolean;
};

export const PostProcessing: React.FC<PostProcessingProps> = ({
  strength = 1.5,
  radius = 0.4,
  threshold = 0,
  enabled = true,
}) => {
  const factory = useCallback(
    () =>
      new PostProcessingPlugin({
        enabled,
        bloom: { strength, radius, threshold },
      }),
    [enabled, strength, radius, threshold]
  );
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    plugin?.update({ enabled, bloom: { strength, radius, threshold } });
  }, [enabled, strength, radius, threshold, plugin]);

  if (!enabled) {
    return null;
  }

  return null;
};
