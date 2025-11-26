import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Reexport principal
export { THREE };

// Extras útiles (opcional, pero recomendado)
export {
  OrbitControls as ThreeOrbitControls,
  GLTFLoader as ThreeGLTFLoader,
  DRACOLoader as ThreeDRACOLoader,
  RGBELoader as ThreeRGBELoader,
  EffectComposer as ThreeEffectComposer,
  RenderPass as ThreeRenderPass,
  UnrealBloomPass as ThreeUnrealBloomPass,
};

// Versión (útil para debugging)
export const THREE_VERSION = THREE.REVISION;

// Patch para desarrollo
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.THREE = THREE;
}