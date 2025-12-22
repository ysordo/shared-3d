import {
  usePlugin
} from "./chunk-2I4VD5OX.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-QGUYSH32.js";
import {
  useScene
} from "./chunk-B4MTQEJU.js";
import {
  useActiveModel
} from "./chunk-L4P2DOS4.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/AdvancedDragRaycaster.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var AdvancedDragRaycaster = ({
  children,
  defaultEnabled = true,
  enableRotationCompensation = true,
  transitionDuration = 300,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const { camera } = useScene();
  const model = useActiveModel();
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isResetting, setIsResetting] = useState(false);
  const rafRef = useRef(null);
  const originalStatesRef = useRef(
    /* @__PURE__ */ new Map()
  );
  const temp = useMemo(
    () => ({
      v1: new THREE.Vector3(),
      v2: new THREE.Vector3(),
      v3: new THREE.Vector3(),
      plane: new THREE.Plane(),
      quat: new THREE.Quaternion()
    }),
    []
  );
  const handleDragStart = useCallback(
    (obj) => {
      if (!originalStatesRef.current.has(obj)) {
        originalStatesRef.current.set(obj, {
          position: obj.position.clone(),
          quaternion: obj.quaternion.clone()
        });
      }
      onDragStart?.(obj);
    },
    [onDragStart]
  );
  const handleDrag = useCallback(
    (obj, deltaScreen) => {
      if (!model || !camera) {
        return;
      }
      obj.getWorldPosition(temp.v1);
      camera.getWorldDirection(temp.v2);
      temp.plane.setFromNormalAndCoplanarPoint(temp.v2.negate(), temp.v1);
      const ndc = new THREE.Vector2(
        deltaScreen.x / window.innerWidth * 2,
        -(deltaScreen.y / window.innerHeight) * 2
      );
      const ray = new THREE.Raycaster();
      ray.setFromCamera(ndc, camera);
      ray.ray.intersectPlane(temp.plane, temp.v3);
      const worldDelta = temp.v3.sub(temp.v1);
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
    (obj) => {
      onDragEnd?.(obj);
    },
    [onDragEnd]
  );
  const eventHandler = useCallback(
    (event) => {
      switch (event.type) {
        case "objectdragstart":
          handleDragStart(event.object);
          break;
        case "objectdrag":
          handleDrag(event.object, event.normalizedDelta?.multiplyScalar(Math.max(window.innerWidth, window.innerHeight)) || event.delta);
          break;
        case "objectdragend":
          handleDragEnd(event.object);
          break;
      }
    },
    [handleDragStart, handleDrag, handleDragEnd]
  );
  const config = useMemo(
    () => ({
      model: model ?? null,
      onEvent: eventHandler,
      enabled: isEnabled
    }),
    [model, eventHandler, isEnabled]
  );
  const factory = useCallback(() => new AdvancedRaycasterPlugin(null, void 0), []);
  const plugin = usePlugin(factory, config);
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
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  const toggleEnabled = useCallback(() => setIsEnabled((prev) => !prev), []);
  const setEnabledCallback = useCallback((value) => setIsEnabled(value), []);
  const controlState = useMemo(
    () => ({
      isEnabled,
      toggleEnabled,
      setEnabled: setEnabledCallback,
      resetAll,
      isResetting
    }),
    [isEnabled, toggleEnabled, setEnabledCallback, resetAll, isResetting]
  );
  useEffect(() => {
    plugin?.setEnabled(isEnabled);
  }, [isEnabled, plugin]);
  return /* @__PURE__ */ jsx(Fragment, { children: children?.(controlState) });
};

export {
  AdvancedDragRaycaster
};
