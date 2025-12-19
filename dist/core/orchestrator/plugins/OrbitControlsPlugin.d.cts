import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-uEPgybCc.cjs';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';
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
