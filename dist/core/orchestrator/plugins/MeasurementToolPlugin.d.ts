import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-BNc555Bu.js';
import * as THREE from 'three';
import '../../loaders/HDRILoader.js';
import '../../cache/types.js';

type MeasurementEvent = {
    point: THREE.Vector3;
    distance?: number;
    points: THREE.Vector3[];
};
type MeasurementConfig = {
    enabled?: boolean;
    pointRadius?: number;
    color?: number;
    onMeasure?: (event: MeasurementEvent) => void;
};
declare class MeasurementToolPlugin implements Plugin {
    name: string;
    private camera;
    private scene;
    private renderer;
    private orchestrator;
    private enabled;
    private points;
    private spheres;
    private line?;
    private config;
    private pointerHandler;
    constructor(config?: MeasurementConfig);
    enable(): void;
    disable(): void;
    update(config: Partial<MeasurementConfig>): void;
    install(ctx: PluginContext): void;
    private handlePointerDown;
    private spawnPoint;
    private finishMeasurement;
    private reset;
    dispose(): void;
}

export { type MeasurementConfig, type MeasurementEvent, MeasurementToolPlugin };
