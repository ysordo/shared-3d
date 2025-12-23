import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-DxWUNuG8.js';
import * as THREE from 'three';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';

type AnnotationData = {
    id: string;
    position: THREE.Vector3;
    target?: THREE.Object3D | undefined;
    content: string | HTMLElement;
    offset?: THREE.Vector3 | undefined;
    visible?: boolean;
};
/**
 * AnnotationsPlugin
 *
 * Plugin para gestionar anotaciones 3D superpuestas en la escena (labels HTML → CanvasTexture → Sprite).
 *
 * Características principales:
 * - Renderizado de texto o elementos HTML arbitrarios como billboards siempre orientados a cámara.
 * - Soporte para posición fija o seguimiento automático de un target (Object3D) con offset configurable.
 * - Diff inteligente para añadir, actualizar y eliminar anotaciones en caliente.
 * - Optimización de recursos: texturas Canvas reutilizadas y ResizeObserver por label para alta resolución (Retina).
 * - Integración completa con el loop centralizado del SceneOrchestrator mediante preRender().
 * - Limpieza exhaustiva de DOM observers, texturas y materiales en dispose().
 * - API reactiva vía update() ideal para cambios dinámicos desde componentes React.
 *
 * Perfecto para tooltips, etiquetas de partes, información contextual o UI 3D enriquecida.
 *
 * @example
 * new AnnotationsPlugin([
 *   {
 *     id: 'engine',
 *     position: new THREE.Vector3(0, 1, 0),
 *     content: '<strong>Motor</strong><br/>V8 5.0L',
 *     offset: new THREE.Vector3(0, 0.5, 0)
 *   }
 * ])
 */
declare class AnnotationsPlugin implements Plugin {
    readonly name = "Annotations";
    private camera;
    private scene;
    private annotations;
    private observers;
    private data;
    private readonly worldPos;
    private readonly offsetVec;
    constructor(initialData?: AnnotationData[]);
    install({ camera, scene }: PluginContext): void;
    preRender(): void;
    update(newData: AnnotationData[]): void;
    private syncAnnotations;
    private addAnnotation;
    private updateAnnotation;
    private removeAnnotation;
    private createSpriteLabel;
    dispose(): void;
}

export { type AnnotationData, AnnotationsPlugin };
