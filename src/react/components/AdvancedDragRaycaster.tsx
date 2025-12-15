'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useScene } from '../../hooks/useScene';
import { AdvancedRaycasterPlugin } from '../../core/orchestrator/plugins/AdvancedRaycasterPlugin';
import { THREE } from '../../lib';
import { useActiveModel } from '../../hooks';

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
  transitionDuration?: number;
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
  const activeModel = useActiveModel();

  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isResetting, setIsResetting] = useState(false);
  const dragState = useRef<{
    isDragging: boolean;
    startPosition: THREE.Vector2;
    currentObject: THREE.Object3D | null;
  }>({
    isDragging: false,
    startPosition: new THREE.Vector2(),
    currentObject: null,
  });

  const originalStates = useRef<
    Map<
      THREE.Object3D,
      { position: THREE.Vector3; quaternion: THREE.Quaternion }
    >
  >(new Map());

  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    if (!activeModel || !orchestrator.camera) {
      return;
    }
    const camera = orchestrator.camera;
    if (orchestrator.has('AdvancedRaycaster')) {
      return;
    }

    orchestrator.use(
      new AdvancedRaycasterPlugin(activeModel, (event: any) => {
        const state = dragState.current;

        switch (event.type) {
          case 'objectdragstart':
            state.isDragging = true;
            state.currentObject = event.object;
            state.startPosition.copy(event.startPosition);

            if (
              state.currentObject &&
              !originalStates.current.has(state.currentObject)
            ) {
              originalStates.current.set(state.currentObject, {
                position: state.currentObject.position.clone(),
                quaternion: state.currentObject.quaternion.clone(),
              });
            }

            onDragStart?.(event.object);
            break;

          case 'objectdrag':
            if (state.isDragging && state.currentObject) {
              // Obtenemos el delta desde el evento
              const delta2 = event.delta as THREE.Vector2;

              // Convertimos Vector2 a Vector3 para poder aplicar rotación y sumarlo a la posición
              tempVector3.set(delta2.x, delta2.y, 0);

              // Compensación de rotación del modelo si está habilitada
              if (enableRotationCompensation && activeModel) {
                activeModel.getWorldQuaternion(tempQuaternion);
                tempQuaternion.invert();
                tempVector3.applyQuaternion(tempQuaternion);
              }

              // Aplicamos el delta a la posición del objeto
              (state.currentObject as any).position.add(tempVector3);
              onDrag?.(state.currentObject, tempVector3.clone());

              state.startPosition.add(delta2);
            }
            break;

          case 'objectdragend':
            if (state.isDragging && state.currentObject) {
              onDragEnd?.(state.currentObject);
            }

            state.isDragging = false;
            state.currentObject = null;
            break;
        }
      })
    );

    return () => {
      orchestrator.plugin('AdvancedRaycaster').dispose?.();
      orchestrator.remove('AdvancedRaycaster');
    };
  }, [
    activeModel,
    orchestrator,
    onDragStart,
    onDrag,
    onDragEnd,
    enableRotationCompensation,
  ]);

  useEffect(() => {
    if (!activeModel || !orchestrator.has('AdvancedRaycaster')) {
      return;
    }
    (
      orchestrator.plugin('AdvancedRaycaster') as AdvancedRaycasterPlugin
    ).manager.setModel(activeModel as THREE.Group);
  }, [activeModel]);

  useEffect(() => {
    if (!orchestrator.has('AdvancedRaycaster')) {
      return;
    }
    (
      orchestrator.plugin('AdvancedRaycaster') as AdvancedRaycasterPlugin
    ).setEnabled(isEnabled);
  }, [isEnabled]);

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
