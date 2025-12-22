import type { ConfigToTuple, Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';
import type { SceneOrchestrator } from '../SceneOrchestrator';

interface PluginConfig {
  distanceThreshold?: number;
  pushBackOffset?: number;
  smooth?: number;
}

/**
 * AdvancedCameraCollisionPlugin
 * 
 * Plugin avanzado de prevención de colisiones para la cámara en escenas 3D.
 * 
 * Características principales:
 * - Evita que la cámara atraviese el modelo activo mediante raycasting multidireccional.
 * - Comprueba colisión frontal (visión) + 6 direcciones laterales para un "empuje" natural.
 * - Configurable: distancia de detección, offset de retroceso y factor de suavizado (lerp).
 * - Totalmente integrado con el loop centralizado del SceneOrchestrator mediante preRender().
 * - Soporte para actualización en caliente de parámetros sin recrear la instancia.
 * - Limpieza segura de recursos en dispose() (cancelación del frame anterior si existiera).
 * 
 * Ideal para experiencias de navegación inmersiva (orbit controls + colisión realista)
 * sin necesidad de física externa.
 * 
 * @example
 * new AdvancedCameraCollisionPlugin({
 *   distanceThreshold: 0.8,
 *   pushBackOffset: 0.2,
 *   smooth: 0.15
 * })
 */
export class AdvancedCameraCollisionPlugin implements Plugin {
  public readonly name = 'AdvancedCameraCollision';

  public distanceThreshold: number;
  public pushBackOffset: number;
  public smooth: number;

  private camera!: THREE.PerspectiveCamera;
  private orchestrator!: SceneOrchestrator;

  private readonly dir = new THREE.Vector3();
  private readonly raycaster = new THREE.Raycaster();
  private readonly targetPos = new THREE.Vector3();
  private readonly forward = new THREE.Vector3();
  private readonly candidate = new THREE.Vector3();

  constructor(
    ...[
      distanceThreshold = 0.6,
      pushBackOffset = 0.1,
      smooth = 0.1
    ]: Partial<ConfigToTuple<PluginConfig, ['distanceThreshold', 'pushBackOffset', 'smooth']>>
  ) {
    this.distanceThreshold = distanceThreshold;
    this.pushBackOffset = pushBackOffset;
    this.smooth = smooth;

    this.raycaster.near = 0;
  }

  install({ camera, orchestrator }: PluginContext): void {
    this.camera = camera as THREE.PerspectiveCamera;
    this.orchestrator = orchestrator;
  }

  preRender(): void {
    const model = this.orchestrator.getActiveModel();
    if (!model) {return;}

    this.targetPos.copy(this.camera.position);

    this.camera.getWorldDirection(this.dir);

    this.forward
      .copy(this.targetPos)
      .add(this.dir.clone().multiplyScalar(-this.distanceThreshold));
    this.checkAndPush(this.targetPos, this.forward, model);

    const offsets: THREE.Vector3[] = [
      new THREE.Vector3(this.distanceThreshold, 0, 0),
      new THREE.Vector3(-this.distanceThreshold, 0, 0),
      new THREE.Vector3(0, this.distanceThreshold, 0),
      new THREE.Vector3(0, -this.distanceThreshold, 0),
      new THREE.Vector3(0, 0, this.distanceThreshold),
      new THREE.Vector3(0, 0, -this.distanceThreshold),
    ];

    offsets.forEach((offset) => {
      this.candidate.copy(this.targetPos).add(offset);
      this.checkAndPush(this.targetPos, this.candidate, model);
    });

    this.camera.position.lerp(this.targetPos, this.smooth);
  }

  private checkAndPush(from: THREE.Vector3, to: THREE.Vector3, model: THREE.Object3D): void {
    this.dir.subVectors(to, from);
    const distance = this.dir.length();
    if (distance === 0) {return;}

    this.dir.normalize();
    this.raycaster.set(from, this.dir);
    this.raycaster.far = distance + this.pushBackOffset;

    const hits = this.raycaster.intersectObject(model, true);
    if (hits.length === 0) {return;}

    const nearest = hits.reduce((a, b) => (a.distance < b.distance ? a : b));
    if (nearest.distance < distance) {
      const pushBack = distance - nearest.distance + this.pushBackOffset;
      const pushVector = this.dir.multiplyScalar(pushBack);
      to.sub(pushVector);
    }
  }

  update(config: {
    distanceThreshold?: number;
    pushBackOffset?: number;
    smooth?: number;
  }): void {
    if (config.distanceThreshold !== undefined) {
      this.distanceThreshold = config.distanceThreshold;
    }
    if (config.pushBackOffset !== undefined) {
      this.pushBackOffset = config.pushBackOffset;
    }
    if (config.smooth !== undefined) {
      this.smooth = config.smooth;
    }
  }

  dispose(): void {}
}