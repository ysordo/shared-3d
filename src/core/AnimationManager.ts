// src/managers/AnimationManager.ts
import * as THREE from 'three';

export class AnimationManager {
  private mixer: THREE.AnimationMixer | null = null;
  private action: THREE.AnimationAction | null = null;
  private isAnimating: boolean = false;
  private onFinish?: () => void;

  constructor(gltfScene: THREE.Object3D, animations: THREE.AnimationClip[]) {
    if (animations.length > 0) {
      this.mixer = new THREE.AnimationMixer(gltfScene);
      this.action = this.mixer.clipAction(animations[0]);
    }
  }

  update(delta: number) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }

  playForward(onFinish?: () => void) {
    if (!this.action || this.isAnimating) {return;}
    this.isAnimating = true;
    this.onFinish = onFinish;

    this.action.reset();
    this.action.paused = false;
    this.action.timeScale = 1; // hacia adelante
    this.action.clampWhenFinished = true;
    this.action.setLoop(THREE.LoopOnce, 1);
    this.action.play();

    this.mixer?.addEventListener('finished', this.handleFinish);
  }

  playBackward(onFinish?: () => void) {
    if (!this.action || this.isAnimating) {return;}
    this.isAnimating = true;
    this.onFinish = onFinish;

    this.action.paused = false;
    this.action.timeScale = -1; // hacia atrás
    this.action.time = this.action.getClip().duration; // empezar en el final
    this.action.clampWhenFinished = true;
    this.action.setLoop(THREE.LoopOnce, 1);
    this.action.play();

    this.mixer?.addEventListener('finished', this.handleFinish);
  }

  private handleFinish = () => {
    this.isAnimating = false;
    if (this.onFinish) {this.onFinish();}
    this.mixer?.removeEventListener('finished', this.handleFinish);
  };

  isBusy() {
    return this.isAnimating;
  }
}
