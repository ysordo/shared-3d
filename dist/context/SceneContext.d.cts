import React, { ReactNode } from 'react';
import { S as SceneConfig, a as SceneOrchestrator } from '../SceneOrchestrator-NoU3ML5L.cjs';
import * as THREE from 'three';
import '../core/loaders/HDRILoader.cjs';
import '../core/cache/types.cjs';

type SceneContextValue = {
    orchestrator: SceneOrchestrator;
    activeModel: THREE.Group | null;
    preload: Map<string, THREE.Group>;
};
declare const SceneProvider: React.ForwardRefExoticComponent<{
    children: ReactNode;
    config?: SceneConfig | undefined;
} & React.CanvasHTMLAttributes<HTMLCanvasElement> & React.RefAttributes<HTMLCanvasElement>>;
declare const useSceneContext: () => SceneContextValue | null;

export { SceneProvider, useSceneContext };
