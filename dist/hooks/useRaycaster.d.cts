import { RaycasterEvent } from '../core/orchestrator/plugins/RaycasterPlugin.cjs';
import '../SceneOrchestrator-DPFoyHCW.cjs';
import '../core/loaders/HDRILoader.cjs';
import '../core/cache/types.cjs';
import 'three';

declare const useRaycaster: (onEvent: (event: RaycasterEvent) => void) => void;

export { useRaycaster };
