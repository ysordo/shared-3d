import React from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-BNc555Bu.js';
import '../../core/loaders/HDRILoader.js';
import '../../core/cache/types.js';
import 'three';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
