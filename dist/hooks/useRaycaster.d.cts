import { RaycasterEvent } from '../core/orchestrator/plugins/RaycasterPlugin.cjs';
import '../SceneOrchestrator-nyu4nGoT.cjs';
import 'three';
import '../core/cache/types.cjs';

declare const useRaycaster: (onEvent: (event: RaycasterEvent) => void) => void;

export { useRaycaster };
