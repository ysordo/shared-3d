import {
  usePlugin
} from "./chunk-3KH2IUAY.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-RKIYRG5U.js";
import {
  useScene
} from "./chunk-DWHU2W2T.js";
import {
  useActiveModel
} from "./chunk-CBC77TWZ.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/AdvancedDragRaycaster.tsx
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
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
  const originalStatesRef = useRef(/* @__PURE__ */ new Map());
  const temp = useMemo(
    () => ({
      v1: new THREE.Vector3(),
      v2: new THREE.Vector3(),
      v3: new THREE.Vector3(),
      v2d1: new THREE.Vector2(),
      v2d2: new THREE.Vector2(),
      plane: new THREE.Plane(),
      quat: new THREE.Quaternion(),
      ray: new THREE.Raycaster()
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
      temp.plane.setFromNormalAndCoplanarPoint(temp.v2, temp.v1);
      temp.v2d1.set(
        deltaScreen.x / window.innerWidth * 2 - 1,
        -(deltaScreen.y / window.innerHeight) * 2 + 1
      );
      temp.ray.setFromCamera(temp.v2d1, camera);
      temp.ray.ray.intersectPlane(temp.plane, temp.v3);
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
          handleDrag(event.object, event.delta);
          break;
        case "objectdragend":
          handleDragEnd(event.object);
          break;
      }
    },
    [handleDragStart, handleDrag, handleDragEnd]
  );
  const factory = useCallback(() => {
    if (!model) {
      return new AdvancedRaycasterPlugin(new THREE.Object3D(), () => {
      });
    }
    return new AdvancedRaycasterPlugin(model, eventHandler);
  }, [model, eventHandler]);
  const plugin = usePlugin(factory, []);
  useEffect(() => {
    if (model) {
      plugin?.update(model, eventHandler);
    }
  }, [model, eventHandler, plugin]);
  useEffect(() => {
    if (plugin?.manager) {
      plugin.manager.setEnabled(isEnabled);
    }
  }, [plugin, isEnabled]);
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
  const setEnabled = useCallback((value) => setIsEnabled(value), []);
  const controlState = useMemo(
    () => ({
      isEnabled,
      toggleEnabled,
      setEnabled,
      resetAll,
      isResetting
    }),
    [isEnabled, toggleEnabled, setEnabled, resetAll, isResetting]
  );
  return /* @__PURE__ */ jsx(Fragment, { children: children?.(controlState) });
};

export {
  AdvancedDragRaycaster
};
