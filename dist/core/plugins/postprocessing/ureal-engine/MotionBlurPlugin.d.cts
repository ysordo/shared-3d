import { Effect } from 'postprocessing';
import { VelocityPassPlugin } from './VelocityPassPlugin.cjs';
import 'three';

declare class MotionBlurPlugin {
    effect: Effect;
    private velocityPass;
    constructor(velocityPass: VelocityPassPlugin, intensity?: number);
    setIntensity(intensity: number): void;
}

export { MotionBlurPlugin };
