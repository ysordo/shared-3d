/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useScene } from '../../hooks/useScene';
import { GLTFLoader } from '../../core/loaders/GLTFLoader';
import type { ModelManifestEntry } from '../../core/cache/types';
import { THREE } from '../../lib';

type InstanceData = {
  position: THREE.Vector3;
  rotation?: THREE.Euler | THREE.Quaternion;
  scale?: THREE.Vector3 | number;
  color?: THREE.Color;
  visible?: boolean;
};

type InstancedModelProps = {
  entry: ModelManifestEntry;
  instances: InstanceData[];
  draco?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export const InstancedModel: React.FC<InstancedModelProps> = ({
  entry,
  instances,
  draco = false,
  castShadow = true,
  receiveShadow = true,
}) => {
  const orchestrator = useScene();
  const scene = orchestrator.scene;
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const instancedMeshes = useRef<Map<string, THREE.InstancedMesh>>(new Map());

  useEffect(() => {
    let isMounted = true;

    const loadAndCreateInstances = async () => {
      if (!isMounted) {
        return;
      }

      try {
        const gltf = await GLTFLoader.load(entry, { draco });
        const model = gltf.clone();

        instancedMeshes.current.forEach((mesh) => {
          scene.remove(mesh);
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        });
        instancedMeshes.current.clear();

        model.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) {
            return;
          }

          const geometry = child.geometry;
          const material = Array.isArray(child.material)
            ? child.material[0]
            : child.material;

          const count = instances.length;
          const instancedMesh = new THREE.InstancedMesh(
            geometry,
            material,
            count
          );

          instancedMesh.castShadow = castShadow;
          instancedMesh.receiveShadow = receiveShadow;

          const dummy = new THREE.Object3D();
          const color = new THREE.Color();

          instances.forEach((instance, i) => {
            dummy.position.copy(instance.position);

            if (instance.rotation instanceof THREE.Euler) {
              dummy.rotation.copy(instance.rotation);
            } else if (instance.rotation instanceof THREE.Quaternion) {
              dummy.quaternion.copy(instance.rotation);
            }

            if (typeof instance.scale === 'number') {
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
              instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            }
          });

          if (material instanceof THREE.Material) {
            instancedMesh.instanceColor = material.vertexColors
              ? null
              : new THREE.InstancedBufferAttribute(
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
        console.error('Error loading InstancedModel:', err);
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
          mesh.material?.dispose();
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
