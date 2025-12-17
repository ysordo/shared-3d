import React, { ReactNode } from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-D4TjWrSK.js';
import '../../core/loaders/HDRILoader.js';
import '../../core/cache/types.js';
import 'three';

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: ReactNode;
};
declare const Canvas: React.FC<CanvasProps>;

export { Canvas };
