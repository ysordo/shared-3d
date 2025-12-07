import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-PJwPoCeo.js';
import 'three';
import '../../cache/types.js';

declare class AdvancedOrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    private config;
    constructor(options?: Partial<typeof this.config>);
    install({ camera, renderer }: PluginContext): void;
    setPanEnabled(enabled: boolean): void;
    setRotateEnabled(enabled: boolean): void;
    setZoomEnabled(enabled: boolean): void;
    setAllEnabled(enabled: boolean): void;
    dispose(): void;
}

export { AdvancedOrbitControlsPlugin };
