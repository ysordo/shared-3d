import { AutoLODConfig } from '../../core/orchestrator/plugins/AutoLODSystemPlugin.js';
import '../../SceneOrchestrator-BNc555Bu.js';
import '../../core/loaders/HDRILoader.js';
import '../../core/cache/types.js';
import 'three';

type AutoLODSystemProps = {
    mediumDistance?: number;
    lowDistance?: number;
    hideDistance?: number;
    enabled?: boolean;
} & Omit<AutoLODConfig, 'distances'>;
declare const AutoLODSystem: React.FC<AutoLODSystemProps>;

export { AutoLODSystem };
