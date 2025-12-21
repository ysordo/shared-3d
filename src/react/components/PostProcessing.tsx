'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { PostProcessingPlugin } from '../../core/orchestrator/plugins/PostProcessingPlugin';

type PostProcessingProps = {
  strength?: number;
  radius?: number;
  threshold?: number;
  enabled?: boolean;
};

/**
 * PostProcessing
 * 
 * Componente declarativo para efecto bloom configurable y reactivo.
 * 
 * Corrección clave:
 * - Eliminado early return condicional → evita violación de Rules of Hooks.
 * - Control de habilitación mediante prop enabled en config → usePlugin decide crear o desactivar en caliente.
 * - Cuando enabled=false el plugin no se crea (deep equality evita instalación) → zero overhead real.
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
  // Configuración completa incluyendo enabled → controla ciclo de vida del plugin
  const config = useMemo(
    () => ({
      enabled,
      bloom: { strength, radius, threshold },
    }),
    [enabled, strength, radius, threshold]
  );

  // Factory estable (sin dependencias externas)
  const factory = useCallback(() => new PostProcessingPlugin(), []);

  // usePlugin maneja:
  // - Creación solo cuando enabled=true
  // - Hot-update de parámetros cuando cambian
  // - Dispose automático cuando enabled=false (plugin removido)
  usePlugin(factory, config);

  return null;
};