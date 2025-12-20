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
  onDrag?: (object: THREE.Object3D, delta: THREE.Vector3) => void;
  onDragEnd?: (object: THREE.Object3D) => void;
};

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
  const originalStatesRef = useRef<
    Map<
      THREE.Object3D,
      { position: THREE.Vector3; quaternion: THREE.Quaternion }
    >
  >(new Map());

  // Objetos temporales por instancia (evita race conditions)
  const temp = useMemo(
    () => ({
      v1: new THREE.Vector3(),
      v2: new THREE.Vector3(),
      v3: new THREE.Vector3(),
      v2d1: new THREE.Vector2(),
      v2d2: new THREE.Vector2(),
      plane: new THREE.Plane(),
      quat: new THREE.Quaternion(),
      ray: new THREE.Raycaster(),
    }),
    []
  );

  // Handlers externos estabilizados
  const handleDragStart = useCallback(
    (obj: THREE.Object3D) => {
      if (!originalStatesRef.current.has(obj)) {
        originalStatesRef.current.set(obj, {
          position: obj.position.clone(),
          quaternion: obj.quaternion.clone(),
        });
      }
      onDragStart?.(obj);
    },
    [onDragStart]
  );

  const handleDrag = useCallback(
    (obj: THREE.Object3D, deltaScreen: THREE.Vector2) => {
      if (!model || !camera) {
        return;
      }

      // Posición actual del objeto
      obj.getWorldPosition(temp.v1);
      camera.getWorldDirection(temp.v2);
      temp.plane.setFromNormalAndCoplanarPoint(temp.v2, temp.v1);

      // Rayos para posición actual y anterior
      temp.v2d1.set(
        (deltaScreen.x / window.innerWidth) * 2 - 1,
        -(deltaScreen.y / window.innerHeight) * 2 + 1
      );
      temp.ray.setFromCamera(temp.v2d1, camera);
      temp.ray.ray.intersectPlane(temp.plane, temp.v3);

      // Delta en espacio mundo
      const worldDelta = temp.v3.sub(temp.v1);

      if (enableRotationCompensation && model) {
        model.getWorldQuaternion(temp.quat).invert();
        worldDelta.applyQuaternion(temp.quat);
      }

      obj.position.add(worldDelta);
      onDrag?.(obj, worldDelta);
    },
    [onDrag, camera, model, enableRotationCompensation, temp]
  );

  const handleDragEnd = useCallback(
    (obj: THREE.Object3D) => {
      onDragEnd?.(obj);
    },
    [onDragEnd]
  );

  // Handler único para el plugin
  const eventHandler = useCallback(
    (event: any) => {
      switch (event.type) {
        case 'objectdragstart':
          handleDragStart(event.object);
          break;
        case 'objectdrag':
          handleDrag(event.object, event.delta);
          break;
        case 'objectdragend':
          handleDragEnd(event.object);
          break;
      }
    },
    [handleDragStart, handleDrag, handleDragEnd]
  );

  // Factory estable: solo cambia si model o handler cambian
  const factory = useCallback(() => {
    if (!model) {
      return new AdvancedRaycasterPlugin(new THREE.Object3D(), () => {});
    }
    return new AdvancedRaycasterPlugin(model, eventHandler);
  }, [model, eventHandler]);

  const plugin = usePlugin(factory, []);

  useEffect(() => {
    if(model){
      plugin?.update(model, eventHandler);
    }
  }, [model, eventHandler, plugin]);

  // Sincronizar enabled
  useEffect(() => {
    if (plugin?.manager) {
      plugin.manager.setEnabled(isEnabled);
    }
  }, [plugin, isEnabled]);

  // Reset animado
  const resetAll = useCallback(() => {
    if (isResetting || originalStatesRef.current.size === 0) {
      return;
    }

    setIsResetting(true);
    const start = performance.now();

    const animate = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / transitionDuration, 1);

      originalStatesRef.current.forEach((original, obj) => {
        obj.position.lerp(original.position, t);
        obj.quaternion.slerp(original.quaternion, t);
      });

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsResetting(false);
        originalStatesRef.current.clear();
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [isResetting, transitionDuration]);

  // Cleanup RAF
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const toggleEnabled = useCallback(() => setIsEnabled((prev) => !prev), []);
  const setEnabled = useCallback((value: boolean) => setIsEnabled(value), []);

  const controlState = useMemo(
    () => ({
      isEnabled,
      toggleEnabled,
      setEnabled,
      resetAll,
      isResetting,
    }),
    [isEnabled, toggleEnabled, setEnabled, resetAll, isResetting]
  );

  return <>{children?.(controlState)}</>;
};
