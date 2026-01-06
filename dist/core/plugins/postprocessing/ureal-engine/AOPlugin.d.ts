import { N8AOPostPass } from 'n8ao';
import { b as Plugin, P as PluginContext } from '../../../../index-vk5WYF3C.js';
import '../../../loaders/loaders.d.js';
import 'three';
import '../../../cache/types.js';

type AOPluginConfig = {
    width: number;
    height: number;
};
declare class AOPlugin implements Plugin {
    readonly name = "AO";
    effect: N8AOPostPass;
    private config;
    constructor(config: Partial<AOPluginConfig>);
    install({ camera, scene }: PluginContext): void;
    resize(width: number, height: number): void;
    setRenderMode(mode: 0 | 1 | 2 | 3 | 4): void;
    setQualityPreset(preset: 'low' | 'medium' | 'high' | 'ultra'): void;
    dispose(): void;
}

export { AOPlugin, type AOPluginConfig };
