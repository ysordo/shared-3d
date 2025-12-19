import React from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-NoU3ML5L.cjs';
import '../../core/loaders/HDRILoader.cjs';
import '../../core/cache/types.cjs';
import 'three';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
