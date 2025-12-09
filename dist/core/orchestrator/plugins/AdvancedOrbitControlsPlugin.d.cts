import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-nyu4nGoT.cjs';
import 'three';
import '../../cache/types.cjs';

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
    setPanEnabled(enabled: boolean): void;
    setRotateEnabled(enabled: boolean): void;
    setZoomEnabled(enabled: boolean): void;
    dispose(): void;
}

export { AdvancedOrbitControlsPlugin };
