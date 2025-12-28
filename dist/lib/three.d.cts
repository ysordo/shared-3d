import * as THREE from 'three';
export { THREE };
export { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export { GLTFLoader as ThreeGLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export { DRACOLoader as ThreeDRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
export { RGBELoader as ThreeRGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
export { EXRLoader as ThreeEXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
export { EffectComposer as ThreeEffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
export { RenderPass as ThreeRenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
export { UnrealBloomPass as ThreeUnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

declare const THREE_VERSION: string;

export { THREE_VERSION };
