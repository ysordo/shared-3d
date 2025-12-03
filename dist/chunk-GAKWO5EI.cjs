"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunk3UB2S2P3cjs = require('./chunk-3UB2S2P3.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/GroundSurface.tsx
var _react = require('react');
var _Reflectorjs = require('three/examples/jsm/objects/Reflector.js');
var PRESETS = {
  mirror: { reflective: true, color: 16777215, roughness: 0, metalness: 1 },
  glass: {
    reflective: true,
    color: 8965375,
    roughness: 0,
    metalness: 0,
    opacity: 0.3,
    transparent: true
  },
  metal: { reflective: true, color: 8947848, roughness: 0.1, metalness: 1 },
  concrete: {
    reflective: false,
    color: 10066329,
    roughness: 0.9,
    metalness: 0
  },
  wood: { reflective: false, color: 9127187, roughness: 0.8, metalness: 0 },
  water: {
    reflective: true,
    color: 35071,
    roughness: 0,
    metalness: 0.1,
    opacity: 0.7,
    transparent: true
  },
  custom: { reflective: true, color: 16777215, roughness: 0, metalness: 1 }
};
var GroundSurface = ({
  type = "mirror",
  size,
  height = 0,
  blur = 0.8,
  resolution = 1024,
  ...custom
}) => {
  const orchestrator = _chunk3UB2S2P3cjs.useScene.call(void 0, );
  const scene = orchestrator.scene;
  const camera = orchestrator.camera;
  _react.useEffect.call(void 0, () => {
    if (!camera) {
      return;
    }
    const preset = PRESETS[type];
    const finalColor = _nullishCoalesce(custom.color, () => ( preset.color));
    const finalRoughness = _nullishCoalesce(custom.roughness, () => ( preset.roughness));
    const finalMetalness = _nullishCoalesce(custom.metalness, () => ( preset.metalness));
    const finalOpacity = _nullishCoalesce(_nullishCoalesce(custom.opacity, () => ( preset.opacity)), () => ( 1));
    const finalTransparent = _nullishCoalesce(_nullishCoalesce(custom.transparent, () => ( preset.transparent)), () => ( false));
    let ground;
    if (preset.reflective && size) {
      const geometry = new _chunkEA3XQ4KJcjs.THREE.PlaneGeometry(size, size);
      ground = new (0, _Reflectorjs.Reflector)(geometry, {
        clipBias: 3e-3,
        textureWidth: resolution,
        textureHeight: resolution,
        color: new _chunkEA3XQ4KJcjs.THREE.Color(finalColor)
      });
      if (Array.isArray(ground.material)) {
        ground.material.forEach((mat) => {
          mat.roughness = finalRoughness;
          mat.metalness = finalMetalness;
          mat.opacity = finalOpacity;
          mat.transparent = finalTransparent;
        });
      } else {
        ground.material.roughness = finalRoughness;
        ground.material.metalness = finalMetalness;
        ground.material.opacity = finalOpacity;
        ground.material.transparent = finalTransparent;
      }
    } else {
      const geometry = size ? new _chunkEA3XQ4KJcjs.THREE.PlaneGeometry(size, size) : new _chunkEA3XQ4KJcjs.THREE.PlaneGeometry(2, 2);
      const material = new _chunkEA3XQ4KJcjs.THREE.MeshStandardMaterial({
        color: finalColor,
        roughness: finalRoughness,
        metalness: finalMetalness,
        opacity: finalOpacity,
        transparent: finalTransparent,
        side: _chunkEA3XQ4KJcjs.THREE.DoubleSide
      });
      ground = new _chunkEA3XQ4KJcjs.THREE.Mesh(geometry, material);
      ground.receiveShadow = true;
      if (!size) {
        ground.onBeforeRender = () => {
          const dist = camera.position.length();
          const scale = dist * 10;
          ground.scale.set(scale, scale, 1);
        };
      }
    }
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = height;
    scene.add(ground);
    return () => {
      scene.remove(ground);
      if ("material" in ground) {
        if (Array.isArray(ground.material)) {
          ground.material.forEach((mat) => mat.dispose());
        } else {
          ground.material.dispose();
        }
      }
      ground.geometry.dispose();
    };
  }, [type, size, height, blur, resolution, ...Object.values(custom)]);
  return null;
};



exports.GroundSurface = GroundSurface;
