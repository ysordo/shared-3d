import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BNc555Bu.js';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';
import 'three';

declare class AdvancedOrbitControlsPlugin implements Plugin {
    private options;
    name: string;
    private controls;
    constructor(options?: Partial<{
        enablePan?: boolean | undefined;
        enableRotate?: boolean | undefined;
        enableZoom?: boolean | undefined;
        dampingFactor?: number | undefined;
        panSpeed?: number | undefined;
        rotateSpeed?: number | undefined;
        zoomSpeed?: number | undefined;
        minDistance?: number | undefined;
        maxDistance?: number | undefined;
        minPolarAngle?: number | undefined;
        maxPolarAngle?: number | undefined;
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
    update(options: Partial<{
        enablePan?: boolean | undefined;
        enableRotate?: boolean | undefined;
        enableZoom?: boolean | undefined;
        dampingFactor?: number | undefined;
        panSpeed?: number | undefined;
        rotateSpeed?: number | undefined;
        zoomSpeed?: number | undefined;
        minDistance?: number | undefined;
        maxDistance?: number | undefined;
        minPolarAngle?: number | undefined;
        maxPolarAngle?: number | undefined;
    }>): void;
}

export { AdvancedOrbitControlsPlugin };
