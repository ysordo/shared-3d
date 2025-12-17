import * as THREE from 'three';

type Annotation = {
    id: string;
    position: [number, number, number];
    target?: THREE.Object3D | string;
    content: string | React.ReactNode;
    offset?: [number, number, number];
};
type AnnotationsProps = {
    annotations: Annotation[];
};
declare const Annotations: React.FC<AnnotationsProps>;

export { Annotations };
