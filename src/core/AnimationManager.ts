// src/managers/AnimationManager.ts
import * as THREE from 'three';

interface AnimationActions {
    [key: string]: THREE.AnimationAction;
}

export class AnimationManager {
    private mixer: THREE.AnimationMixer | null = null;
    private actions: AnimationActions = {};
    private isAnimating: boolean = false;
    private onFinish?: () => void;

    constructor(gltfScene: THREE.Object3D, animations: THREE.AnimationClip[]) {
        if (animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(gltfScene);
            this.setupActions(animations);
        }
    }

    private setupActions(animations: THREE.AnimationClip[]): void {
        animations.forEach((clip, index) => {
            this.actions[index] = this.mixer!.clipAction(clip);
        });
    }

    update(delta: number): void {
        this.mixer?.update(delta);
    }

    playForward(key: string, onFinish?: () => void): void {
        this.playAnimation(key, 1, 0, onFinish);
    }

    playBackward(key: string, onFinish?: () => void): void {
        const action = this.actions[key];
        this.playAnimation(key, -1, action?.getClip().duration || 0, onFinish);
    }

    private playAnimation(key: string, timeScale: number, startTime: number, onFinish?: () => void): void {
        const action = this.actions[key];
        
        if (!action || this.isAnimating) {return;}

        this.isAnimating = true;
        this.onFinish = onFinish;

        this.configureAction(action, timeScale, startTime);
        action.play();

        this.mixer?.addEventListener('finished', this.handleFinish);
    }

    private configureAction(action: THREE.AnimationAction, timeScale: number, startTime: number): void {
        action.reset();
        action.paused = false;
        action.timeScale = timeScale;
        action.time = startTime;
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
    }

    private handleFinish = (): void => {
        this.isAnimating = false;
        this.onFinish?.();
        this.mixer?.removeEventListener('finished', this.handleFinish);
    };

    isBusy(): boolean {
        return this.isAnimating;
    }

    dispose(): void {
        this.mixer?.removeEventListener('finished', this.handleFinish);
        this.mixer = null;
        this.actions = {};
    }
}