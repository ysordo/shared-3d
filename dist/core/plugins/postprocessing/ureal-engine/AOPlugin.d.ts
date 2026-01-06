import { Effect } from 'postprocessing';
import { b as Plugin, P as PluginContext } from '../../../../index-vk5WYF3C.js';
import '../../../loaders/loaders.d.js';
import 'three';
import '../../../cache/types.js';

type AOPluginConfig = {
    intensity?: number;
    aoRadius?: number;
    bias?: number;
    samples?: number;
};
declare const DEFAULT_AO_CONFIG: Required<AOPluginConfig>;
declare class AOPlugin implements Plugin {
    private width;
    private height;
    readonly name = "HBAO";
    effect: Effect;
    private config;
    constructor(width: number, height: number, config?: Partial<AOPluginConfig>);
    install({ camera }: PluginContext): void;
    resize(width: number, height: number): void;
    update(config: Partial<AOPluginConfig>): void;
    dispose(): void;
}

export { AOPlugin, type AOPluginConfig, DEFAULT_AO_CONFIG };
