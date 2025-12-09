import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-nyu4nGoT.cjs';
import 'three';
import '../../cache/types.cjs';

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    get maxDistance(): number;
    get minDistance(): number;
    dispose(): void;
}

export { OrbitControlsPlugin };
