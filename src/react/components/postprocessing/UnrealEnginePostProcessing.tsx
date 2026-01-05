'use client';

import { useCallback } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { UnrealEnginePostProcessingPlugin } from '../../../core/plugins/postprocessing/UnrealEnginePostProcessingPlugin';

type UnrealEnginePostProcessingProps = {};

export const UnrealEnginePostProcessing: React.FC<
  UnrealEnginePostProcessingProps
> = () => {
  const factory = useCallback(() => new UnrealEnginePostProcessingPlugin(), []);

  usePlugin(factory, {});

  return null;
};
