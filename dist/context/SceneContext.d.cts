import React, { ReactNode } from 'react';
import { S as SceneConfig, a as SceneOrchestrator } from '../SceneOrchestrator-oKj90s6N.cjs';
import * as THREE from 'three';
import '../core/loaders/GLTFLoader.cjs';
import '../core/cache/types.cjs';
import '../core/loaders/HDRILoader.cjs';

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
declare const useScene: () => SceneContextValue;

export { SceneProvider, useScene };
