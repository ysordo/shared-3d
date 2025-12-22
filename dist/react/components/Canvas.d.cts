import React from 'react';
import { S as SceneConfig } from '../../SceneOrchestrator-CSrTns7D.cjs';
import '../../core/loaders/HDRILoader.cjs';
import '../../core/cache/types.cjs';
import 'three';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
