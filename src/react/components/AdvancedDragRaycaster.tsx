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
  /** Render prop para exponer estado y controles al consumidor */
  children?: (state: {
    isEnabled: boolean;
    toggleEnabled: () => void;
    setEnabled: (value: boolean) => void;
    resetAll: () => void;
    isResetting: boolean;
  }) => React.ReactNode;

  /** Estado inicial de habilitación */
  defaultEnabled?: boolean;

  /** Compensar rotación del modelo raíz durante drag (recomendado = true) */
  enableRotationCompensation?: boolean;

  /** Duración en ms de la animación de reset */
  transitionDuration?: number;

  /** Callbacks opcionales de ciclo de drag */
  onDragStart?: (object: THREE.Object3D) => void;
  onDrag?: (object: THREE.Object3D, worldDelta: THREE.Vector3) => void;
  onDragEnd?: (object: THREE.Object3D) => void;
};

/**
 * AdvancedDragRaycaster
 *
 * Componente declarativo avanzado para arrastrar objetos 3D individuales con raycasting.
 *
 * Características:
 * - Drag preciso en espacio mundo con compensación opcional de rotación del modelo raíz.
 * - Estado exponible vía render prop (enabled, toggle, reset animado).
 * - Integración óptima con usePlugin inteligente: instancia única + hot-update de modelo/handler.
 * - Reset suave animado de objetos arrastrados a su posición/quaternion original.
 * - Sin RAF propio para drag (event-driven) + cleanup seguro del reset.
 * - Totalmente reactivo y headless.
 *
 * Ideal para editores 3D, configuradores de productos o experiencias interactivas donde
 * el usuario pueda reposicionar partes individuales.
 *
 * @example
 * <AdvancedDragRaycaster defaultEnabled={true}>
 *   {({ isEnabled, toggleEnabled, resetAll }) => (
 *     <button onClick={toggleEnabled}>
 *       Drag {isEnabled ? 'ON' : 'OFF'}
 *     </button>
 *   )}
 * </AdvancedDragRaycaster>
 */
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

  // Objetos temporales reutilizados → cero allocations durante drag
  const temp = useMemo(
    () => ({
      v1: new THREE.Vector3(),
      v2: new THREE.Vector3(),
      v3: new THREE.Vector3(),
      plane: new THREE.Plane(),
      quat: new THREE.Quaternion(),
    }),
    []
  );

  // Handlers internos estabilizados
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
      temp.plane.setFromNormalAndCoplanarPoint(temp.v2.negate(), temp.v1); // normal hacia cámara

      // Proyectar delta pantalla a plano
      const ndc = new THREE.Vector2(
        (deltaScreen.x / window.innerWidth) * 2,
        -(deltaScreen.y / window.innerHeight) * 2
      );
      const ray = new THREE.Raycaster();
      ray.setFromCamera(ndc, camera);
      ray.ray.intersectPlane(temp.plane, temp.v3);

      const worldDelta = temp.v3.sub(temp.v1);

      // Compensación de rotación del modelo raíz
      if (enableRotationCompensation && model) {
        model.getWorldQuaternion(temp.quat).invert();
        worldDelta.applyQuaternion(temp.quat);
      }

      obj.position.add(worldDelta);
      onDrag?.(obj, worldDelta);
    },
    [camera, model, enableRotationCompensation, onDrag, temp]
  );

  const handleDragEnd = useCallback(
    (obj: THREE.Object3D) => {
      onDragEnd?.(obj);
    },
    [onDragEnd]
  );

  // Handler único para el plugin (estabilizado)
  const eventHandler = useCallback(
    (event: any) => {
      console.log(
        '[AdvancedDragRaycaster] Test verify events actions, capture de content: ',
        event
      );
      switch (event.type) {
        case 'objectdragstart':
          handleDragStart(event.object);
          break;
        case 'objectdrag':
          handleDrag(
            event.object,
            event.current
          );
          break;
        case 'objectdragend':
          handleDragEnd(event.object);
          break;
      }
    },
    [handleDragStart, handleDrag, handleDragEnd]
  );

  // Configuración completa para usePlugin → deep equality + hot-update
  const config = useMemo(
    () => ({
      model: model ?? null,
      onEvent: eventHandler,
      //enabled: isEnabled,
    }),
    [model, eventHandler]
  );

  // Factory estable (sin dependencias)
  const factory = useCallback(
    () => new AdvancedRaycasterPlugin(null, undefined),
    []
  );

  // usePlugin maneja creación, update y dispose automáticamente
  const plugin = usePlugin(factory, config);

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

  // Cleanup RAF del reset
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const toggleEnabled = useCallback(() => setIsEnabled((prev) => !prev), []);
  const setEnabledCallback = useCallback(
    (value: boolean) => setIsEnabled(value),
    []
  );

  const controlState = useMemo(
    () => ({
      isEnabled,
      toggleEnabled,
      setEnabled: setEnabledCallback,
      resetAll,
      isResetting,
    }),
    [isEnabled, toggleEnabled, setEnabledCallback, resetAll, isResetting]
  );

  useEffect(() => {
  console.log('[AdvancedDragRaycaster] model changed:', model);
}, [model]);

  useEffect(() => {

    plugin?.setEnabled(isEnabled);
  }, [isEnabled, plugin]);

  return <>{children?.(controlState)}</>;
};
