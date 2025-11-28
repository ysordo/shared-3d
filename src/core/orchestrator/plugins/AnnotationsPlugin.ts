import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';

type AnnotationData = {
  id: string;
  position: THREE.Vector3;
  target?: THREE.Object3D | undefined;
  content: string | HTMLElement;
  offset?: THREE.Vector3 | undefined;
  visible?: boolean | undefined;
};

export class AnnotationsPlugin implements Plugin {
  name = 'Annotations';
  private annotations = new Map<string, THREE.Object3D>();
  private camera!: THREE.Camera;
  private scene!: THREE.Scene;

  constructor(private data: AnnotationData[]) {}

  install({ camera, scene }: PluginContext): void {
    this.camera = camera;
    this.scene = scene;

    this.data.forEach((ann) => {
      const label = this.createLabel(ann.content, ann.offset || new THREE.Vector3(0, 1, 0));
      label.position.copy(ann.position);
      label.userData.annotationId = ann.id;
      label.visible = ann.visible ?? true;

      // Seguir al objeto objetivo
      if (ann.target) {
        label.userData.followTarget = ann.target;
      }

      this.annotations.set(ann.id, label);
      this.scene.add(label);
    });

    // Update loop
    const update = () => {
      this.annotations.forEach((label) => {
        if (label.userData.followTarget) {
          label.userData.followTarget.getWorldPosition(label.position);
          label.position.add(label.userData.offset || new THREE.Vector3(0, 1, 0));
        }

        // Siempre mirar a cámara
        label.lookAt(this.camera.position);
      });
      requestAnimationFrame(update);
    };
    update();
  }

  private createLabel(content: string | HTMLElement, offset: THREE.Vector3): THREE.Object3D {
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

    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.userData.offset = offset;
    sprite.userData.canvas = canvas;
    sprite.userData.div = div;

    // Resize
    const resize = () => {
      const width = div.offsetWidth;
      const height = div.offsetHeight;
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(2, 2);
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(div);
    resize();

    return sprite;
  }

  dispose(): void {
    this.annotations.forEach((sprite) => {
      if (sprite.parent) {sprite.parent.remove(sprite);}
      if(sprite instanceof THREE.Sprite) {
        sprite.material.map?.dispose();
        sprite.material.dispose();
    }
    });
    this.annotations.clear();
  }
}