// src/lib/three.ts
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
var THREE_VERSION = THREE.REVISION;
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.THREE = THREE;
}

export {
  THREE,
  OrbitControls,
  GLTFLoader,
  DRACOLoader,
  RGBELoader,
  EXRLoader,
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
  THREE_VERSION
};
