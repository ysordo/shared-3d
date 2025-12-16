import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-oKj90s6N.cjs';
import * as THREE from 'three';
import '../../loaders/GLTFLoader.cjs';
import '../../cache/types.cjs';
import '../../loaders/HDRILoader.cjs';

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
