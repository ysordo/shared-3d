import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BNc555Bu.js';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';
import 'three';

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    get maxDistance(): number;
    get minDistance(): number;
    get enableRotate(): boolean;
    get enableZoom(): boolean;
    get enablePan(): boolean;
    dispose(): void;
}

export { OrbitControlsPlugin };
