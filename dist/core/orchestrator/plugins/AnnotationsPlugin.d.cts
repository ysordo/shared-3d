import { b as Plugin, P as PluginContext } from '../../../SceneOrchestrator-uEPgybCc.cjs';
import * as THREE from 'three';
import '../../loaders/HDRILoader.cjs';
import '../../cache/types.cjs';

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
    private _rafId;
    private _observers;
    constructor(data: AnnotationData[]);
    install({ camera, scene }: PluginContext): void;
    private addAnnotation;
    private updateAnnotation;
    private removeAnnotation;
    private startLoop;
    private syncAnnotations;
    private createLabel;
    dispose(): void;
    update(data: AnnotationData[]): void;
}

export { type AnnotationData, AnnotationsPlugin };
