import React from 'react';
import { S as SceneConfig, a as SceneOrchestrator } from '../../index-DE4jh8VF.cjs';
import * as THREE from 'three';
import '../../core/loaders/loaders.d.cjs';
import '../../core/cache/types.cjs';

type SceneContextValue = {
    orchestrator: SceneOrchestrator;
    /** Precarga un modelo y lo añade al mapa interno */
    preloadModel: (id: string, model: THREE.Group) => void;
    /** Remueve un modelo precargado */
    removePreloaded: (id: string) => void;
    /** Obtiene un modelo precargado (solo lectura) */
    getPreloaded: (id: string) => THREE.Group | undefined;
    /** Mapa completo de precargados (solo lectura, shallow copy para seguridad) */
    preloadedModels: ReadonlyMap<string, THREE.Group>;
};
type SceneProviderProps = {
    children: React.ReactNode;
    config?: SceneConfig | undefined;
};
declare const SceneProvider: React.ForwardRefExoticComponent<SceneProviderProps & React.RefAttributes<HTMLCanvasElement>>;
declare const useSceneContext: () => SceneContextValue;
declare const useScene: () => SceneOrchestrator;
declare const usePreload: () => {
    preloadModel: (id: string, model: THREE.Group) => void;
    removePreloaded: (id: string) => void;
    getPreloaded: (id: string) => THREE.Group | undefined;
    preloadedModels: ReadonlyMap<string, THREE.Group<THREE.Object3DEventMap>>;
};

export { SceneProvider, usePreload, useScene, useSceneContext };
