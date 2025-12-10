import { RaycasterEvent } from '../core/orchestrator/plugins/RaycasterPlugin.js';
import '../SceneOrchestrator-IMvwSmmi.js';
import '../core/cache/types.js';
import 'three';

declare const useRaycaster: (onEvent: (event: RaycasterEvent) => void) => void;

export { useRaycaster };
