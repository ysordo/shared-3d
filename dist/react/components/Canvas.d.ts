import React, { ReactNode } from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-0U6fAu6q.js';
import '../../core/loaders/HDRILoader.js';
import '../../core/cache/types.js';
import 'three';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
