'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../hooks/usePlugin';
import { PostProcessingPlugin } from '../../core/plugins/PostProcessingPlugin';

type PostProcessingProps = {
  strength?: number;
  radius?: number;
  threshold?: number;
  enabled?: boolean;
};

/**
 * Post Processing
 *
 * Declarative component for configurable and reactive bloom effect.
 *
 * Key fix:
 * -Removed early return conditional → avoids violation of Rules of Hooks.
 * -Enable control via prop enabled in config → usePlugin decides to create or disable hot.
 * -When enabled=false the plugin is not created (deep equality prevents installation) → zero real overhead.
 *
 * @example
 * <PostProcessing enabled={enableBloom} strength={1.8} />
 */
export const PostProcessing: React.FC<PostProcessingProps> = ({
  strength = 1.5,
  radius = 0.4,
  threshold = 0,
  enabled = true,
}) => {
  const config = useMemo(
    () => ({
      enabled,
      bloom: { strength, radius, threshold },
    }),
    [enabled, strength, radius, threshold]
  );

  const factory = useCallback(() => new PostProcessingPlugin(), []);

  usePlugin(factory, config);

  return null;
};
