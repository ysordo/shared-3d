import React from 'react';
import { S as SceneConfig } from '../../index-DE4jh8VF.cjs';
import '../../core/loaders/loaders.d.cjs';
import 'three';
import '../../core/cache/types.cjs';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
