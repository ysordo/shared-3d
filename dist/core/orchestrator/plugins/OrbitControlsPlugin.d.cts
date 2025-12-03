import { P as Plugin, b as PluginContext } from '../../../SceneOrchestrator-BeiVe8WF.cjs';
import 'three';
import '../../cache/types.cjs';

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    dispose(): void;
}

export { OrbitControlsPlugin };
