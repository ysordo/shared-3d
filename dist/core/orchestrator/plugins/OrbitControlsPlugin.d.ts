import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BanCYJ3v.js';
import '../../loaders/GLTFLoader.js';
import '../../cache/types.js';
import 'three';
import '../../loaders/HDRILoader.js';

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    get maxDistance(): number;
    get minDistance(): number;
    dispose(): void;
}

export { OrbitControlsPlugin };
