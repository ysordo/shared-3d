import { RaycasterEvent } from '../core/orchestrator/plugins/RaycasterPlugin.cjs';
import '../SceneOrchestrator-DI3vK_io.cjs';
import '../core/cache/types.cjs';
import 'three';

declare const useRaycaster: (onEvent: (event: RaycasterEvent) => void) => void;

export { useRaycaster };
