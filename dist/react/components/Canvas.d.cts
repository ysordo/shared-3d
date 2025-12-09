import React, { ReactNode } from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-qQ99RpXe.cjs';
import 'three';
import '../../core/cache/types.cjs';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
