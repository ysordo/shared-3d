import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-X3T7OXl7.cjs';
import 'three';
import '../../cache/types.cjs';

declare class AdvancedOrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    private config;
    constructor(options?: Partial<typeof this.config>);
    install({ camera, renderer }: PluginContext): void;
    private safeUpdate;
    setPanEnabled(enabled: boolean): void;
    setRotateEnabled(enabled: boolean): void;
    setZoomEnabled(enabled: boolean): void;
    setAllEnabled(enabled: boolean): void;
    dispose(): void;
}

export { AdvancedOrbitControlsPlugin };
