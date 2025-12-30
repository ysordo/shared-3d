'use client';

import { useCallback, useMemo } from 'react';
import { usePlugin } from '../hooks/usePlugin';
import type { AnnotationData } from '../../core/plugins/AnnotationsPlugin';
import { AnnotationsPlugin } from '../../core/plugins/AnnotationsPlugin';
import { useScene } from '../hooks/useScene';
import { THREE } from '../../lib';

type Annotation = {
  /** ID único de la anotación (requerido para diff eficiente) */
  id: string;
  /** Posición fija en espacio mundo */
  position: [number, number, number];
  /** Target opcional: Object3D directo o string (name) para lookup en escena */
  target?: THREE.Object3D | string;
  /** Contenido: string (HTML permitido) o React node (convertido a string) */
  content: string | React.ReactNode;
  /** Offset relativo al target o posición fija */
  offset?: [number, number, number];
};

type AnnotationsProps = {
  /** Array de anotaciones a renderizar */
  annotations: Annotation[];
};

/**
 * Annotations
 *
 * Componente declarativo para anotaciones 3D superpuestas (labels HTML → Sprite billboards).
 *
 * Características:
 * - Mapeo completo de props a AnnotationData interno del plugin.
 * - Soporte para target por Object3D directo o lookup por name (scene.getObjectByName).
 * - Configuración totalmente reactiva mediante usePlugin inteligente (deep equality + update() automático).
 * - Conversión segura de React nodes a string (fallback para contenido complejo).
 * - Instancia única del plugin + hot-update eficiente → ideal para listas dinámicas grandes.
 * - Componente headless puro (sin renderizado visual propio).
 *
 * Ideal para tooltips, etiquetas de partes, información contextual o UI enriquecida en 3D.
 *
 * @example
 * <Annotations
 *   annotations={[
 *     {
 *       id: 'engine',
 *       position: [0, 1, 0],
 *       content: '<strong>Motor</strong><br/>V8 5.0L',
 *       offset: [0, 0.5, 0]
 *     },
 *     {
 *       id: 'wheel',
 *       target: 'wheel_front_left', // lookup por name
 *       content: 'Rueda 20"'
 *     }
 *   ]}
 * />
 */
export const Annotations: React.FC<AnnotationsProps> = ({ annotations }) => {
  const { scene } = useScene();

  // Transformación completa y memoizada → fuente de verdad para deep equality
  const pluginData = useMemo<AnnotationData[]>(
    () =>
      annotations.map((ann) => {
        const target =
          typeof ann.target === 'string'
            ? scene.getObjectByName(ann.target)
            : ann.target;

        return {
          id: ann.id,
          position: new THREE.Vector3(...ann.position),
          target,
          content:
            typeof ann.content === 'string' ? ann.content : String(ann.content),
          offset: ann.offset ? new THREE.Vector3(...ann.offset) : undefined,
          visible: true, // siempre visible por defecto (puede extenderse en futuro)
        };
      }),
    [annotations, scene]
  );

  // Factory estable (sin dependencias)
  const factory = useCallback(() => new AnnotationsPlugin([]), []);

  // usePlugin maneja creación, hot-update (plugin.update(data)) y dispose automáticamente
  usePlugin(factory, pluginData);

  return null;
};
