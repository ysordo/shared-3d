import React, { ReactNode } from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-oKj90s6N.cjs';
import '../../core/loaders/GLTFLoader.cjs';
import '../../core/cache/types.cjs';
import 'three';
import '../../core/loaders/HDRILoader.cjs';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
