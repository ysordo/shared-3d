import React from 'react';
import { THREE } from '../../lib';
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
export declare const Annotations: React.FC<AnnotationsProps>;
export {};
//# sourceMappingURL=Annotations.d.ts.map