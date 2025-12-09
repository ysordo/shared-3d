import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-C0-hSjJ-.js';
import 'three';
import '../../cache/types.js';

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    dispose(): void;
}

export { OrbitControlsPlugin };
