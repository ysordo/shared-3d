import React, { ReactNode } from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-D4TjWrSK.js';
import '../../core/loaders/HDRILoader.js';
import '../../core/cache/types.js';
import 'three';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
