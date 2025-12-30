import React from 'react';
import { S as SceneConfig } from '../../index-oH7U2rpR.js';
import '../../core/loaders/loaders.d.js';
import 'three';
import '../../core/cache/types.js';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
