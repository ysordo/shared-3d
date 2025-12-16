import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-rsjgaMlg.js';
import * as THREE from 'three';
import '../../loaders/GLTFLoader.js';
import '../../cache/types.js';
import '../../loaders/HDRILoader.js';

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
