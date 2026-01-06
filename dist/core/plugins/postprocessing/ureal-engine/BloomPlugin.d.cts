import { BloomEffect } from 'postprocessing';
import { b as Plugin } from '../../../../index-DE4jh8VF.cjs';
import '../../../loaders/loaders.d.cjs';
import 'three';
import '../../../cache/types.cjs';

declare class BloomPlugin implements Plugin {
    readonly name = "Bloom";
    effect: BloomEffect;
    constructor();
    install(): void;
}

export { BloomPlugin };
