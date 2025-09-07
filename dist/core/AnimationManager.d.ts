import * as THREE from 'three';
export declare class AnimationManager {
    private mixer;
    private action;
    private isAnimating;
    private onFinish?;
    constructor(gltfScene: THREE.Object3D, animations: THREE.AnimationClip[]);
    update(delta: number): void;
    playForward(onFinish?: () => void): void;
    playBackward(onFinish?: () => void): void;
    private handleFinish;
    isBusy(): boolean;
}
//# sourceMappingURL=AnimationManager.d.ts.map