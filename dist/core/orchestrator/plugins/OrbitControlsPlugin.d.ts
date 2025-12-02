import type { Plugin, PluginContext } from '../types';
export declare class OrbitControlsPlugin implements Plugin {
    name: string;
    private controls;
    install({ camera, renderer }: PluginContext): void;
    dispose(): void;
}
//# sourceMappingURL=OrbitControlsPlugin.d.ts.map