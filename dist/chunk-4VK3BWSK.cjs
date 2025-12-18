"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkE76QCBEIcjs = require('./chunk-E76QCBEI.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/primitives/SceneObject.tsx
var _react = require('react');
var SceneObject = ({
  object,
  parent = "scene",
  name,
  position,
  rotation,
  scale = [1, 1, 1],
  visible = true,
  castShadow = false,
  receiveShadow = false
}) => {
  const orchestrator = _chunkE76QCBEIcjs.useScene.call(void 0, );
  _react.useEffect.call(void 0, () => {
    if (!orchestrator) {
      return;
    }
    if (name) {
      object.name = name;
    }
    object.visible = visible;
    object.castShadow = castShadow;
    object.receiveShadow = receiveShadow;
    if (position) {
      object.position.set(...position);
    }
    if (rotation) {
      object.rotation.set(...rotation);
    }
    if (scale) {
      object.scale.set(...scale);
    }
    let targetParent = null;
    if (parent === "scene") {
      targetParent = orchestrator.scene;
    } else if (parent === "model") {
      targetParent = orchestrator.getActiveModel();
    } else if (typeof parent === "string") {
      targetParent = orchestrator.scene.getObjectByName(parent) || null;
    } else if (parent instanceof _chunkEA3XQ4KJcjs.THREE.Object3D) {
      targetParent = parent;
    }
    if (!targetParent) {
      console.warn("[SceneObject] Padre no encontrado:", parent);
      return;
    }
    targetParent.add(object);
    return () => {
      if (object.parent) {
        object.parent.remove(object);
      }
      object.traverse((child) => {
        if (child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh) {
          _optionalChain([child, 'access', _ => _.geometry, 'optionalAccess', _2 => _2.dispose, 'call', _3 => _3()]);
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([child, 'access', _4 => _4.material, 'optionalAccess', _5 => _5.dispose, 'call', _6 => _6()]);
          }
        }
      });
    };
  }, [
    orchestrator,
    object,
    parent,
    name,
    position,
    rotation,
    scale,
    visible,
    castShadow,
    receiveShadow
  ]);
  return null;
};



exports.SceneObject = SceneObject;
