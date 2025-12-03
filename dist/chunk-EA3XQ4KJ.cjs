"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }// src/lib/three.ts
var _three = require('three'); var THREE = _interopRequireWildcard(_three);
var _OrbitControlsjs = require('three/examples/jsm/controls/OrbitControls.js');
var _GLTFLoaderjs = require('three/examples/jsm/loaders/GLTFLoader.js');
var _DRACOLoaderjs = require('three/examples/jsm/loaders/DRACOLoader.js');
var _RGBELoaderjs = require('three/examples/jsm/loaders/RGBELoader.js');
var _EXRLoaderjs = require('three/examples/jsm/loaders/EXRLoader.js');
var _EffectComposerjs = require('three/examples/jsm/postprocessing/EffectComposer.js');
var _RenderPassjs = require('three/examples/jsm/postprocessing/RenderPass.js');
var _UnrealBloomPassjs = require('three/examples/jsm/postprocessing/UnrealBloomPass.js');
var THREE_VERSION = THREE.REVISION;
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.THREE = THREE;
}












exports.THREE = THREE; exports.OrbitControls = _OrbitControlsjs.OrbitControls; exports.GLTFLoader = _GLTFLoaderjs.GLTFLoader; exports.DRACOLoader = _DRACOLoaderjs.DRACOLoader; exports.RGBELoader = _RGBELoaderjs.RGBELoader; exports.EXRLoader = _EXRLoaderjs.EXRLoader; exports.EffectComposer = _EffectComposerjs.EffectComposer; exports.RenderPass = _RenderPassjs.RenderPass; exports.UnrealBloomPass = _UnrealBloomPassjs.UnrealBloomPass; exports.THREE_VERSION = THREE_VERSION;
