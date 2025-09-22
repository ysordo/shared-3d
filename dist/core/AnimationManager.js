// src/managers/AnimationManager.ts
import * as THREE from 'three';
export class AnimationManager {
    constructor(gltfScene, animations) {
        this.mixer = null;
        this.actions = {};
        this.isAnimating = false;
        this.handleFinish = () => {
            this.isAnimating = false;
            this.onFinish?.();
            this.mixer?.removeEventListener('finished', this.handleFinish);
        };
        if (animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(gltfScene);
            this.setupActions(animations);
        }
    }
    setupActions(animations) {
        animations.forEach((clip, index) => {
            this.actions[index] = this.mixer.clipAction(clip);
        });
    }
    update(delta) {
        this.mixer?.update(delta);
    }
    playForward(key, onFinish) {
        this.playAnimation(key, 1, 0, onFinish);
    }
    playBackward(key, onFinish) {
        const action = this.actions[key];
        this.playAnimation(key, -1, action?.getClip().duration || 0, onFinish);
    }
    playAnimation(key, timeScale, startTime, onFinish) {
        const action = this.actions[key];
        if (!action || this.isAnimating) {
            return;
        }
        this.isAnimating = true;
        this.onFinish = onFinish;
        this.configureAction(action, timeScale, startTime);
        action.play();
        this.mixer?.addEventListener('finished', this.handleFinish);
    }
    configureAction(action, timeScale, startTime) {
        action.reset();
        action.paused = false;
        action.timeScale = timeScale;
        action.time = startTime;
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
    }
    isBusy() {
        return this.isAnimating;
    }
    dispose() {
        this.mixer?.removeEventListener('finished', this.handleFinish);
        this.mixer = null;
        this.actions = {};
    }
}
//# sourceMappingURL=AnimationManager.js.map