import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-oKj90s6N.cjs';
import * as THREE from 'three';
import '../../loaders/GLTFLoader.cjs';
import '../../cache/types.cjs';
import '../../loaders/HDRILoader.cjs';

type AnnotationData = {
    id: string;
    position: THREE.Vector3;
    target?: THREE.Object3D | undefined;
    content: string | HTMLElement;
    offset?: THREE.Vector3 | undefined;
    visible?: boolean | undefined;
};
declare class AnnotationsPlugin implements Plugin {
    private data;
    name: string;
    private annotations;
    private camera;
    private scene;
    constructor(data: AnnotationData[]);
    install({ camera, scene }: PluginContext): void;
    private createLabel;
    dispose(): void;
}

export { AnnotationsPlugin };
