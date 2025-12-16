import { RaycasterEvent } from '../core/orchestrator/plugins/RaycasterPlugin.js';
import '../SceneOrchestrator-BanCYJ3v.js';
import '../core/loaders/GLTFLoader.js';
import '../core/cache/types.js';
import 'three';
import '../core/loaders/HDRILoader.js';

declare const useRaycaster: (onEvent: (event: RaycasterEvent) => void) => void;

export { useRaycaster };
