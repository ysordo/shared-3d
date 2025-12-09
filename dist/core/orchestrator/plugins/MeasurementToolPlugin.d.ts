import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-C0-hSjJ-.js';
import * as THREE from 'three';
import '../../cache/types.js';

type MeasurementEvent = {
    point: THREE.Vector3;
    distance?: number;
    points: THREE.Vector3[];
};
declare class MeasurementToolPlugin implements Plugin {
    name: string;
    private points;
    private line?;
    private spheres;
    private onMeasure?;
    constructor(onMeasure?: (event: MeasurementEvent) => void);
    install({ scene, camera, renderer, orchestrator }: PluginContext): void;
    private reset;
    dispose(): void;
}

export { type MeasurementEvent, MeasurementToolPlugin };
