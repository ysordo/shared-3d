"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkWAZQGQ6Zcjs = require('./chunk-WAZQGQ6Z.cjs');


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
  visible = true,
  ...custom
}) => {
  const { scene, camera } = _chunkWAZQGQ6Zcjs.useScene.call(void 0, );
  const ground = _react.useRef.call(void 0, null);
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
    if (preset.reflective && size) {
      const geometry = new _chunkEA3XQ4KJcjs.THREE.PlaneGeometry(size, size);
      ground.current = new (0, _Reflectorjs.Reflector)(geometry, {
        clipBias: 3e-3,
        textureWidth: resolution,
        textureHeight: resolution,
        color: new _chunkEA3XQ4KJcjs.THREE.Color(finalColor)
      });
      if (Array.isArray(ground.current.material)) {
        ground.current.material.forEach((mat) => {
          mat.roughness = finalRoughness;
          mat.metalness = finalMetalness;
          mat.opacity = finalOpacity;
          mat.transparent = finalTransparent;
        });
        ground.current.castShadow = true;
      } else {
        ground.current.material.roughness = finalRoughness;
        ground.current.material.metalness = finalMetalness;
        ground.current.material.opacity = finalOpacity;
        ground.current.material.transparent = finalTransparent;
        ground.current.castShadow = true;
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
      ground.current = new _chunkEA3XQ4KJcjs.THREE.Mesh(geometry, material);
      ground.current.receiveShadow = true;
      if (!size) {
        ground.current.onBeforeRender = () => {
          const dist = camera.position.length();
          const scale = dist * 10;
          _optionalChain([ground, 'access', _ => _.current, 'optionalAccess', _2 => _2.scale, 'access', _3 => _3.set, 'call', _4 => _4(scale, scale, 1)]);
        };
      }
    }
    ground.current.rotation.x = -Math.PI / 2;
    ground.current.position.y = height;
    scene.add(ground.current);
    return () => {
      if (ground.current) {
        scene.remove(ground.current);
        if ("material" in ground.current) {
          if (Array.isArray(ground.current.material)) {
            ground.current.material.forEach((mat) => mat.dispose());
          } else {
            ground.current.material.dispose();
          }
        }
        ground.current.geometry.dispose();
      }
    };
  }, [
    type,
    size,
    height,
    blur,
    resolution,
    camera,
    custom.color,
    custom.roughness,
    custom.metalness,
    custom.opacity,
    custom.transparent,
    scene
  ]);
  _react.useEffect.call(void 0, () => {
    if (ground.current) {
      ground.current.visible = visible;
    }
  }, [visible]);
  return null;
};



exports.GroundSurface = GroundSurface;
