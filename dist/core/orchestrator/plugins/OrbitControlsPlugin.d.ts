import { P as Plugin, b as PluginContext } from '../../../SceneOrchestrator-B4om0ttP.js';
import 'three';
import '../../cache/types.js';

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    dispose(): void;
}

export { OrbitControlsPlugin };
