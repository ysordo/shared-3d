import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-X3T7OXl7.cjs';
import 'three';
import '../../cache/types.cjs';

declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    dispose(): void;
}

export { OrbitControlsPlugin };
