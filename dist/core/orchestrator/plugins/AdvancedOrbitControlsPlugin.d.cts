import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-uEPgybCc.cjs';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';
import 'three';

declare class AdvancedOrbitControlsPlugin implements Plugin {
    private options;
    name: string;
    private controls;
    constructor(options?: Partial<{
        enablePan?: boolean;
        enableRotate?: boolean;
        enableZoom?: boolean;
        dampingFactor?: number;
        panSpeed?: number;
        rotateSpeed?: number;
        zoomSpeed?: number;
        minDistance?: number;
        maxDistance?: number;
        minPolarAngle?: number;
        maxPolarAngle?: number;
    }>);
    install({ camera, renderer }: PluginContext): void;
    set enablePan(enabled: boolean);
    set enableRotate(enabled: boolean);
    set enableZoom(enabled: boolean);
    set maxDistance(distance: number);
    set minDistance(distance: number);
    get maxDistance(): number;
    get minDistance(): number;
    get enableRotate(): boolean;
    get enableZoom(): boolean;
    get enablePan(): boolean;
    dispose(): void;
}

export { AdvancedOrbitControlsPlugin };
