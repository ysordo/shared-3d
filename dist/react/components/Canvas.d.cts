import React from 'react';
import { S as SceneConfig } from '../../index-BbV6Hzfa.cjs';
import '../../core/loaders/loaders.d.cjs';
import 'three';
import '../../core/cache/types.cjs';

declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    config?: SceneConfig;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLCanvasElement>>;

export { Canvas };
