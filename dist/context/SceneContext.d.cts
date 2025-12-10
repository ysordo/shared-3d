import React, { ReactNode } from 'react';
import { S as SceneConfig, a as SceneOrchestrator } from '../SceneOrchestrator-DI3vK_io.cjs';
import * as THREE from 'three';
import '../core/cache/types.cjs';

type SceneContextValue = {
    orchestrator: SceneOrchestrator;
    activeModel: THREE.Group | null;
};
type SceneProviderProps = {
    children: ReactNode;
    config?: SceneConfig | undefined;
};
declare const SceneProvider: React.ForwardRefExoticComponent<SceneProviderProps & React.RefAttributes<HTMLCanvasElement>>;
declare const useScene: () => SceneContextValue;

export { SceneProvider, useScene };
