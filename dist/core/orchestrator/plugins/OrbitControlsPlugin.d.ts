import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BMDHZMn7.js';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';
import 'three';

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    get maxDistance(): number;
    get minDistance(): number;
    dispose(): void;
}

export { OrbitControlsPlugin };
