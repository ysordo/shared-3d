/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useScene } from '../../hooks/useScene';
import { AdvancedRaycasterPlugin } from '../../core/orchestrator/plugins/AdvancedRaycasterPlugin';
import * as THREE from 'three';

type AdvancedDragRaycasterProps = {
  children: (state: {
    isEnabled: boolean;
    toggleEnabled: () => void;
    setEnabled: (value: boolean) => void;
    resetAll: () => void;
    isResetting: boolean;
  }) => React.ReactNode;
  defaultEnabled?: boolean;
  enableRotationCompensation?: boolean;
  transitionDuration?: number; // ← NUEVO: global!
  onDragStart?: (object: THREE.Object3D) => void;
  onDrag?: (object: THREE.Object3D, delta: THREE.Vector3) => void;
  onDragEnd?: (object: THREE.Object3D) => void;
};

const tempVector1 = new THREE.Vector3();
const tempVector2 = new THREE.Vector3();
const tempVector3 = new THREE.Vector3();
const tempVector2_1 = new THREE.Vector2();
const tempVector2_2 = new THREE.Vector2();
const tempPlane = new THREE.Plane();
const tempQuaternion = new THREE.Quaternion();
const tempRaycaster = new THREE.Raycaster();

export const AdvancedDragRaycaster: React.FC<AdvancedDragRaycasterProps> = ({
  children,
  defaultEnabled = true,
  enableRotationCompensation = true,
  transitionDuration = 0,
  onDragStart,
  onDrag,
  onDragEnd,
}) => {
  const orchestrator = useScene();
  const activeModel = orchestrator.getActiveModel();
  const camera = orchestrator.camera;

  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isResetting, setIsResetting] = useState(false);
  const [plugin, setPlugin] = useState<AdvancedRaycasterPlugin | null>(null);

  const originalStates = useRef<
    Map<
      THREE.Object3D,
      { position: THREE.Vector3; quaternion: THREE.Quaternion }
    >
  >(new Map());

  useEffect(() => {
    if (!activeModel || !camera) {
      return;
    }

    const newPlugin = new AdvancedRaycasterPlugin(activeModel, (event: any) => {
      if (!isEnabled) {
        return;
      }

      let isDragging = false;
      let startPosition = new THREE.Vector2();
      let currentObject: THREE.Object3D | null = null;

      switch (event.type) {
        case 'objectdragstart':
          isDragging = true;
          currentObject = event.object;
          startPosition.copy(event.startPosition);

          if (currentObject && !originalStates.current.has(currentObject)) {
            originalStates.current.set(currentObject, {
              position: currentObject.position.clone(),
              quaternion: currentObject.quaternion.clone(),
            });
          }

          onDragStart?.(event.object);
          break;

        case 'objectdrag':
          if (isDragging && currentObject) {
            (currentObject as any).getWorldPosition(tempVector1);
            camera.getWorldDirection(tempVector2);
            tempPlane.setFromNormalAndCoplanarPoint(tempVector2, tempVector1);

            tempVector2_1.set(
              (event.currentPosition.x / window.innerWidth) * 2 - 1,
              -(event.currentPosition.y / window.innerHeight) * 2 + 1
            );
            tempVector2_2.set(
              (startPosition.x / window.innerWidth) * 2 - 1,
              -(startPosition.y / window.innerHeight) * 2 + 1
            );

            tempRaycaster.setFromCamera(tempVector2_1, camera);
            tempRaycaster.ray.intersectPlane(tempPlane, tempVector1);
            tempRaycaster.setFromCamera(tempVector2_2, camera);
            tempRaycaster.ray.intersectPlane(tempPlane, tempVector2);

            if (tempVector1 && tempVector2) {
              tempVector3.subVectors(tempVector1, tempVector2);

              if (enableRotationCompensation && activeModel) {
                activeModel.getWorldQuaternion(tempQuaternion);
                tempQuaternion.invert();
                tempVector3.applyQuaternion(tempQuaternion);
              }

              (currentObject as any).position.add(tempVector3);
              onDrag?.(currentObject, tempVector3.clone());
            }

            startPosition.copy(event.currentPosition);
          }
          break;

        case 'objectdragend':
          if (isDragging) {
            onDragEnd?.(event.object);
          }
          break;
      }
    });

    orchestrator.use(newPlugin);
    setPlugin(newPlugin);

    return () => {
      newPlugin.dispose();
    };
  }, [
    activeModel,
    camera,
    onDragStart,
    onDrag,
    onDragEnd,
    enableRotationCompensation,
  ]);

  useEffect(() => {
    plugin?.manager.setEnabled(isEnabled);
  }, [plugin, isEnabled]);

  const toggleEnabled = () => setIsEnabled((prev) => !prev);
  const setEnabled = (value: boolean) => setIsEnabled(value);

  const resetAll = () => {
    if (isResetting) {
      return;
    }
    setIsResetting(true);

    const duration = transitionDuration;
    if (duration <= 0) {
      originalStates.current.forEach((state, obj) => {
        obj.position.copy(state.position);
        obj.quaternion.copy(state.quaternion);
      });
      setIsResetting(false);
      return;
    }

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      originalStates.current.forEach((state, obj) => {
        obj.position.lerp(state.position, t);
        obj.quaternion.slerp(state.quaternion, t);
      });

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsResetting(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      {children({
        isEnabled,
        toggleEnabled,
        setEnabled,
        resetAll,
        isResetting,
      })}
    </>
  );
};
