import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

export type AnnotationData = {
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
export class AnnotationsPlugin implements Plugin {
  public readonly name = 'Annotations';

  private camera!: THREE.Camera;
  private scene!: THREE.Scene;

  private annotations = new Map<string, THREE.Sprite>();
  private observers = new Map<string, ResizeObserver>();

  private data: AnnotationData[] = [];

  private readonly worldPos = new THREE.Vector3();
  private readonly offsetVec = new THREE.Vector3();

  constructor(initialData: AnnotationData[] = []) {
    this.data = initialData;
  }

  install({ camera, scene }: PluginContext): void {
    this.camera = camera;
    this.scene = scene;

    this.syncAnnotations();
  }

  preRender(): void {
    if (this.annotations.size === 0) {return;}

    const cameraPosition = this.camera.position;

    this.annotations.forEach((sprite) => {
      const target = sprite.userData.followTarget as THREE.Object3D | undefined;

      if (target) {
        target.getWorldPosition(this.worldPos);
        const offset = sprite.userData.offset as THREE.Vector3;
        sprite.position.copy(this.worldPos).add(offset);
      }

      sprite.lookAt(cameraPosition);
    });
  }

  update(newData: AnnotationData[]): void {
    this.data = newData;
    this.syncAnnotations();
  }

  private syncAnnotations(): void {
    const nextIds = new Set(this.data.map((a) => a.id));

    this.annotations.forEach((_, id) => {
      if (!nextIds.has(id)) {
        this.removeAnnotation(id);
      }
    });

    this.data.forEach((ann) => {
      if (!this.annotations.has(ann.id)) {
        this.addAnnotation(ann);
      } else {
        this.updateAnnotation(ann);
      }
    });
  }

  private addAnnotation(ann: AnnotationData): void {
    const offset = ann.offset ?? new THREE.Vector3(0, 1, 0);
    const sprite = this.createSpriteLabel(ann.id, ann.content, offset);

    sprite.position.copy(ann.position);
    sprite.visible = ann.visible ?? true;
    sprite.userData.followTarget = ann.target;

    this.scene.add(sprite);
    this.annotations.set(ann.id, sprite);
  }

  private updateAnnotation(ann: AnnotationData): void {
    const sprite = this.annotations.get(ann.id)!;

    sprite.visible = ann.visible ?? true;
    sprite.userData.followTarget = ann.target;

    if (ann.target) {
      ann.target.getWorldPosition(sprite.position);
      const offset = sprite.userData.offset as THREE.Vector3;
      sprite.position.add(offset);
    } else if (ann.position) {
      sprite.position.copy(ann.position);
    }
  }

  private removeAnnotation(id: string): void {
    const sprite = this.annotations.get(id);
    if (!sprite) {return;}

    sprite.parent?.remove(sprite);

    const observer = this.observers.get(id);
    observer?.disconnect();
    this.observers.delete(id);

    if (sprite.material instanceof THREE.SpriteMaterial) {
      sprite.material.map?.dispose();
      sprite.material.dispose();
    }

    this.annotations.delete(id);
  }

  private createSpriteLabel(id: string,content: string | HTMLElement, offset: THREE.Vector3): THREE.Sprite {
    const div = document.createElement('div');
    div.className = 'annotation-label';
    div.style.cssText = `
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      pointer-events: none;
      white-space: nowrap;
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255,255,255,0.2);
    `;

    if (typeof content === 'string') {
      div.innerHTML = content;
    } else {
      div.appendChild(content);
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);

    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const material = new THREE.SpriteMaterial({
      map: texture,
      depthTest: false,
      transparent: true,
    });

    const sprite = new THREE.Sprite(material);

    sprite.userData.offset = offset;
    sprite.userData.canvas = canvas;
    sprite.userData.div = div;

    const resize = () => {
      const width = div.offsetWidth || 1;
      const height = div.offsetHeight || 1;

      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(2, 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(div);
    this.observers.set(id, observer);

    resize();

    return sprite;
  }

  dispose(): void {
    this.annotations.forEach((_, id) => this.removeAnnotation(id));
    this.annotations.clear();
    this.observers.clear();
  }
}