import { P as Plugin, b as PluginContext } from '../../../SceneOrchestrator-BeiVe8WF.cjs';
import 'three';
import '../../cache/types.cjs';

declare class AdvancedOrbitControlsPlugin implements Plugin {
    private options;
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
