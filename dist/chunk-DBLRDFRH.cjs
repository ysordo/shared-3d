"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkHIHVQAZZcjs = require('./chunk-HIHVQAZZ.cjs');


var _chunkRIJLTLXBcjs = require('./chunk-RIJLTLXB.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/InstancedModel.tsx
var _react = require('react');
var InstancedModel = ({
  entry,
  instances,
  draco = false,
  castShadow = true,
  receiveShadow = true
}) => {
  const orchestrator = _chunkHIHVQAZZcjs.useScene.call(void 0, );
  const scene = orchestrator.scene;
  const groupRef = _react.useRef.call(void 0, new _chunkEA3XQ4KJcjs.THREE.Group());
  const instancedMeshes = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  _react.useEffect.call(void 0, () => {
    let isMounted = true;
    const loadAndCreateInstances = async () => {
      if (!isMounted) {
        return;
      }
      try {
        const gltf = await _chunkRIJLTLXBcjs.GLTFLoader.load(entry, { draco });
        const model = gltf.clone();
        instancedMeshes.current.forEach((mesh) => {
          scene.remove(mesh);
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            _optionalChain([mesh, 'access', _ => _.material, 'optionalAccess', _2 => _2.dispose, 'call', _3 => _3()]);
          }
        });
        instancedMeshes.current.clear();
        model.traverse((child) => {
          if (!(child instanceof _chunkEA3XQ4KJcjs.THREE.Mesh)) {
            return;
          }
          const geometry = child.geometry;
          const material = Array.isArray(child.material) ? child.material[0] : child.material;
          const count = instances.length;
          const instancedMesh = new _chunkEA3XQ4KJcjs.THREE.InstancedMesh(
            geometry,
            material,
            count
          );
          instancedMesh.castShadow = castShadow;
          instancedMesh.receiveShadow = receiveShadow;
          const dummy = new _chunkEA3XQ4KJcjs.THREE.Object3D();
          const color = new _chunkEA3XQ4KJcjs.THREE.Color();
          instances.forEach((instance, i) => {
            dummy.position.copy(instance.position);
            if (instance.rotation instanceof _chunkEA3XQ4KJcjs.THREE.Euler) {
              dummy.rotation.copy(instance.rotation);
            } else if (instance.rotation instanceof _chunkEA3XQ4KJcjs.THREE.Quaternion) {
              dummy.quaternion.copy(instance.rotation);
            }
            if (typeof instance.scale === "number") {
              dummy.scale.setScalar(instance.scale);
            } else if (instance.scale) {
              dummy.scale.copy(instance.scale);
            } else {
              dummy.scale.set(1, 1, 1);
            }
            dummy.updateMatrix();
            instancedMesh.setMatrixAt(i, dummy.matrix);
            if (instance.color) {
              color.set(instance.color);
              instancedMesh.setColorAt(i, color);
            }
            if (instance.visible === false) {
              instancedMesh.instanceMatrix.setUsage(_chunkEA3XQ4KJcjs.THREE.DynamicDrawUsage);
            }
          });
          if (material instanceof _chunkEA3XQ4KJcjs.THREE.Material) {
            instancedMesh.instanceColor = material.vertexColors ? null : new _chunkEA3XQ4KJcjs.THREE.InstancedBufferAttribute(
              new Float32Array(count * 3),
              3
            );
          }
          instancedMesh.instanceMatrix.needsUpdate = true;
          if (instancedMesh.instanceColor) {
            instancedMesh.instanceColor.needsUpdate = true;
          }
          scene.add(instancedMesh);
          instancedMeshes.current.set(child.uuid, instancedMesh);
        });
        groupRef.current.add(model);
        scene.add(groupRef.current);
      } catch (err) {
        console.error("Error loading InstancedModel:", err);
      }
    };
    loadAndCreateInstances();
    return () => {
      isMounted = false;
      instancedMeshes.current.forEach((mesh) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          _optionalChain([mesh, 'access', _4 => _4.material, 'optionalAccess', _5 => _5.dispose, 'call', _6 => _6()]);
        }
      });
      instancedMeshes.current.clear();
      if (groupRef.current.parent) {
        groupRef.current.parent.remove(groupRef.current);
      }
    };
  }, [entry, instances, draco, castShadow, receiveShadow]);
  return null;
};



exports.InstancedModel = InstancedModel;
