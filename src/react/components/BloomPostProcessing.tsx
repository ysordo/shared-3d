'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../hooks/usePlugin';
import { BloomPostProcessingPlugin } from '../../core/plugins/BloomPostProcessingPlugin';

type BloomPostProcessingProps = {
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
 * <BloomPostProcessing enabled={enableBloom} strength={1.8} />
 */
export const BloomPostProcessing: React.FC<BloomPostProcessingProps> = ({
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

  const factory = useCallback(() => new BloomPostProcessingPlugin(), []);

  usePlugin(factory, config);

  return null;
};
