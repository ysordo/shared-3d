import React, { ReactNode } from 'react';
import { S as SceneConfig, a as SceneOrchestrator } from '../SceneOrchestrator-BanCYJ3v.js';
import * as THREE from 'three';
import '../core/loaders/GLTFLoader.js';
import '../core/cache/types.js';
import '../core/loaders/HDRILoader.js';

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
