import * as THREE from 'three';
export declare class AnimationManager {
    private mixer;
    private actions;
    private isAnimating;
    private onFinish?;
    constructor(gltfScene: THREE.Object3D, animations: THREE.AnimationClip[]);
    private setupActions;
    update(delta: number): void;
    playForward(key: string, onFinish?: () => void): void;
    playBackward(key: string, onFinish?: () => void): void;
    private playAnimation;
    private configureAction;
    private handleFinish;
    isBusy(): boolean;
    dispose(): void;
}
//# sourceMappingURL=AnimationManager.d.ts.map