import { RaycasterEvent } from '../core/orchestrator/plugins/RaycasterPlugin.js';
import '../SceneOrchestrator-BNc555Bu.js';
import '../core/loaders/HDRILoader.js';
import '../core/cache/types.js';
import 'three';

declare const useRaycaster: (onEvent: (event: RaycasterEvent) => void) => void;

export { useRaycaster };
