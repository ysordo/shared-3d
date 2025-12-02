import type { ReactNode } from 'react';
import React from 'react';
import { SceneOrchestrator } from '../core/orchestrator/SceneOrchestrator';
import type { SceneConfig } from '../core/orchestrator/SceneOrchestrator';
type SceneProviderProps = {
    children: ReactNode;
    config?: SceneConfig | undefined;
};
export declare const SceneProvider: React.ForwardRefExoticComponent<SceneProviderProps & React.RefAttributes<HTMLCanvasElement>>;
export declare const useScene: () => SceneOrchestrator;
export {};
//# sourceMappingURL=SceneContext.d.ts.map