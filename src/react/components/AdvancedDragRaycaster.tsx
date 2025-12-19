'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePlugin } from '../../hooks/usePlugin';
import { AdvancedRaycasterPlugin } from '../../core/orchestrator/plugins/AdvancedRaycasterPlugin';
import { useScene } from '../../hooks/useScene';
import { useActiveModel } from '../../hooks/useActiveModel';
import { THREE } from '../../lib';

type AdvancedDragRaycasterProps = {
  children?: (state: {
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
  onDrag?: (object: THREE.Object3D, delta: THREE.Vector2) => void;
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
  transitionDuration = 300,
  onDragStart,
  onDrag,
  onDragEnd,
}) => {
  const { camera } = useScene();
  const model = useActiveModel();
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isResetting, setIsResetting] = useState(false);
  const rafRef = useRef<number | null>(null);
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

  // Callbacks estabilizados
  const handleDragStart = useCallback(
    (obj: THREE.Object3D, startPosition: THREE.Vector2) => {
      const state = dragState.current;
      state.isDragging = true;
      state.currentObject = obj;
      state.startPosition.copy(startPosition);

      if (
        state.currentObject &&
        !originalStates.current.has(state.currentObject)
      ) {
        originalStates.current.set(state.currentObject, {
          position: state.currentObject.position.clone(),
          quaternion: state.currentObject.quaternion.clone(),
        });
      }
      onDragStart?.(obj);
    },
    [onDragStart]
  );
  const handleDrag = useCallback(
    (current: THREE.Vector2) => {
      const state = dragState.current;
      if (state.isDragging && state.currentObject) {
        (state.currentObject as any).getWorldPosition(tempVector1);
        camera.getWorldDirection(tempVector2);
        tempPlane.setFromNormalAndCoplanarPoint(tempVector2, tempVector1);

        tempVector2_1.set(
          (current.x / window.innerWidth) * 2 - 1,
          -(current.y / window.innerHeight) * 2 + 1
        );
        tempVector2_2.set(
          (state.startPosition.x / window.innerWidth) * 2 - 1,
          -(state.startPosition.y / window.innerHeight) * 2 + 1
        );

        tempRaycaster.setFromCamera(tempVector2_1, camera);
        tempRaycaster.ray.intersectPlane(tempPlane, tempVector1);
        tempRaycaster.setFromCamera(tempVector2_2, camera);
        tempRaycaster.ray.intersectPlane(tempPlane, tempVector2);

        if (tempVector1 && tempVector2) {
          tempVector3.subVectors(tempVector1, tempVector2);

          if (enableRotationCompensation && model) {
            model.getWorldQuaternion(tempQuaternion);
            tempQuaternion.invert();
            tempVector3.applyQuaternion(tempQuaternion);
          }

          (state.currentObject as any).position.add(tempVector3);
          onDrag?.(
            state.currentObject,
            new THREE.Vector2(...tempVector3.clone())
          );
        }

        state.startPosition.copy(current);
      }
    },
    [onDrag]
  );
  const handleDragEnd = useCallback(() => {
    const state = dragState.current;
    if (state.isDragging && state.currentObject) {
      onDragEnd?.(state.currentObject);
    }

    state.isDragging = false;
    state.currentObject = null;
  }, [onDragEnd]);

  const handle = useCallback(
    (event: any) => {
      switch (event.type) {
        case 'objectdragstart': {
          handleDragStart(event.object, event.startPosition);
          break;
        }
        case 'objectdrag': {
          handleDrag(event.current);
          break;
        }
        case 'objectdragend': {
          handleDragEnd();
          break;
        }
      }
    },
    [handleDragStart, handleDrag, handleDragEnd]
  );

  const factory = useCallback(
    () => model && new AdvancedRaycasterPlugin(model as THREE.Object3D, handle),
    [model, enableRotationCompensation, handle, camera]
  );

  const plugin = usePlugin(factory, [factory]);

  useEffect(() => {
    if (!plugin) {
      return;
    }
    plugin.manager.setEnabled(isEnabled);
  }, [isEnabled, plugin]);

  const resetAll = useCallback(() => {
    if (isResetting) {
      return;
    }
    setIsResetting(true);

    const duration = transitionDuration;

    if (originalStates.current.size === 0) {
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
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsResetting(false);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [isResetting, transitionDuration]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const toggleEnabled = useCallback(() => setIsEnabled((prev) => !prev), []);
  const setEnabledWrapper = useCallback(
    (value: boolean) => setIsEnabled(value),
    []
  );

  const state = useMemo(
    () => ({
      isEnabled,
      toggleEnabled,
      setEnabled: setEnabledWrapper,
      resetAll,
      isResetting,
    }),
    [isEnabled, toggleEnabled, setEnabledWrapper, resetAll, isResetting]
  );

  return <>{children?.(state)}</>;
};
