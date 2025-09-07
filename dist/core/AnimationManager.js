// src/managers/AnimationManager.ts
import * as THREE from 'three';
export class AnimationManager {
    constructor(gltfScene, animations) {
        this.mixer = null;
        this.action = null;
        this.isAnimating = false;
        this.handleFinish = () => {
            this.isAnimating = false;
            if (this.onFinish) {
                this.onFinish();
            }
            this.mixer?.removeEventListener('finished', this.handleFinish);
        };
        if (animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(gltfScene);
            this.action = this.mixer.clipAction(animations[0]);
        }
    }
    update(delta) {
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }
    playForward(onFinish) {
        if (!this.action || this.isAnimating) {
            return;
        }
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
    playBackward(onFinish) {
        if (!this.action || this.isAnimating) {
            return;
        }
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
    isBusy() {
        return this.isAnimating;
    }
}
//# sourceMappingURL=AnimationManager.js.map