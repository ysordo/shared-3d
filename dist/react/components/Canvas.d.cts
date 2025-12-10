import React, { ReactNode } from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-DI3vK_io.cjs';
import '../../core/cache/types.cjs';
import 'three';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
