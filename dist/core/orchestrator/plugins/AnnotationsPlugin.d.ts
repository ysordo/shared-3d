import type { Plugin, PluginContext } from '../types';
import { THREE } from '../../../lib';
type AnnotationData = {
    id: string;
    position: THREE.Vector3;
    target?: THREE.Object3D | undefined;
    content: string | HTMLElement;
    offset?: THREE.Vector3 | undefined;
    visible?: boolean | undefined;
};
export declare class AnnotationsPlugin implements Plugin {
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
export {};
//# sourceMappingURL=AnnotationsPlugin.d.ts.map