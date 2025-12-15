import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-Bx7eqX8k.cjs';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';
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
