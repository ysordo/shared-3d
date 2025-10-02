import * as THREE from 'three';
interface AnimationActions {
    [key: string]: THREE.AnimationAction;
}
export declare class AnimationManager {
    private mixer;
    actions: AnimationActions;
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
export {};
//# sourceMappingURL=AnimationManager.d.ts.map