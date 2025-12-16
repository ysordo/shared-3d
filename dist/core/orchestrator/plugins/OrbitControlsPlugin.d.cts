import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-oKj90s6N.cjs';
import '../../loaders/GLTFLoader.cjs';
import '../../cache/types.cjs';
import 'three';
import '../../loaders/HDRILoader.cjs';

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    get maxDistance(): number;
    get minDistance(): number;
    dispose(): void;
}

export { OrbitControlsPlugin };
