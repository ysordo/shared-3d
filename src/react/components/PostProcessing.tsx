'use client';
import type React from 'react';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
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
  const orchestrator = useScene();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const plugin = new PostProcessingPlugin(bloom as {
      strength: number;
      radius: number;
      threshold: number;
    });
    orchestrator.use(plugin);

    return () => { };
  }, [enabled, bloom.strength, bloom.radius, bloom.threshold]);

  return null;
};
