import React, { ReactNode } from 'react';
import { S as SceneConfig, a as SceneOrchestrator } from '../SceneOrchestrator-D4TjWrSK.js';
import * as THREE from 'three';
import '../core/loaders/HDRILoader.js';
import '../core/cache/types.js';

type SceneContextValue = {
    orchestrator: SceneOrchestrator;
    activeModel: THREE.Group | null;
    preload: Map<string, THREE.Group>;
};
type SceneProviderProps = {
    children: ReactNode;
    config?: SceneConfig | undefined;
    canvasRef?: React.RefObject<HTMLCanvasElement>;
};
declare const SceneProvider: React.ForwardRefExoticComponent<SceneProviderProps & React.RefAttributes<HTMLCanvasElement>>;
declare const useSceneContext: () => SceneContextValue;

export { SceneProvider, useSceneContext };
