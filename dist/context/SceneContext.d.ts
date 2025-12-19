import React, { ReactNode } from 'react';
import { S as SceneConfig, a as SceneOrchestrator } from '../SceneOrchestrator-BNc555Bu.js';
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
};
declare const SceneProvider: React.ForwardRefExoticComponent<SceneProviderProps & React.RefAttributes<HTMLCanvasElement>>;
declare const useSceneContext: () => SceneContextValue;

export { SceneProvider, useSceneContext };
