import { BloomEffect } from 'postprocessing';
import { b as Plugin, P as PluginContext } from '../../../../index-vk5WYF3C.js';
import '../../../loaders/loaders.d.js';
import 'three';
import '../../../cache/types.js';

declare class BloomPlugin implements Plugin {
    readonly name = "Bloom";
    effect: BloomEffect;
    constructor();
    install(__context: PluginContext): void;
}

export { BloomPlugin };
