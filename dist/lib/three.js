/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// Reexport principal
export { THREE };
// Useful extras (optional, but recommended)
export { OrbitControls as ThreeOrbitControls, GLTFLoader as ThreeGLTFLoader, DRACOLoader as ThreeDRACOLoader, RGBELoader as ThreeRGBELoader, EXRLoader as ThreeEXRLoader, EffectComposer as ThreeEffectComposer, RenderPass as ThreeRenderPass, UnrealBloomPass as ThreeUnrealBloomPass, };
// Version (useful for debugging)
export const THREE_VERSION = THREE.REVISION;
// Patch for development environment
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    window.THREE = THREE;
}
//# sourceMappingURL=three.js.map