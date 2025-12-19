import { AutoLODConfig } from '../../core/orchestrator/plugins/AutoLODSystemPlugin.cjs';
import '../../SceneOrchestrator-uEPgybCc.cjs';
import '../../core/loaders/HDRILoader.cjs';
import '../../core/cache/types.cjs';
import 'three';

type AutoLODSystemProps = {
    mediumDistance?: number;
    lowDistance?: number;
    hideDistance?: number;
    enabled?: boolean;
} & Omit<AutoLODConfig, 'distances'>;
declare const AutoLODSystem: React.FC<AutoLODSystemProps>;

export { AutoLODSystem };
