import type { Plugin, PluginContext } from '../types';
export declare class AdvancedCameraCollisionPlugin implements Plugin {
    readonly distanceThreshold: number;
    readonly pushBackOffset: number;
    name: string;
    private handle;
    constructor(distanceThreshold?: number, pushBackOffset?: number);
    install({ camera, orchestrator }: PluginContext): void;
    dispose(): void;
}
//# sourceMappingURL=AdvancedCameraCollisionPlugin.d.ts.map