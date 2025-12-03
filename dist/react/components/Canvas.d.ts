import React, { ReactNode } from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-PJwPoCeo.js';
import 'three';
import '../../core/cache/types.js';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
