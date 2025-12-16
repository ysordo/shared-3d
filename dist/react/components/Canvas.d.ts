import React, { ReactNode } from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-BanCYJ3v.js';
import '../../core/loaders/GLTFLoader.js';
import '../../core/cache/types.js';
import 'three';
import '../../core/loaders/HDRILoader.js';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
