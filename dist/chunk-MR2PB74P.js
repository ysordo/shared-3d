import {
  useActiveModel
} from "./chunk-4Y6GMSZS.js";
import {
  usePlugin
} from "./chunk-LRTR63O6.js";
import {
  useScene
} from "./chunk-AARDPV3F.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-CQTY6LVA.js";
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
  const { camera, renderer } = useScene();
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
      v1_1: new THREE.Vector3(),
      v2_2: new THREE.Vector3(),
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
    (obj, currentPosition, startPosition) => {
      if (!model || !camera) {
        return;
      }
      obj.getWorldPosition(temp.v1);
      camera.getWorldDirection(temp.v2);
      temp.plane.setFromNormalAndCoplanarPoint(temp.v2.negate(), temp.v1);
      const ndc = new THREE.Vector2(
        currentPosition.x / renderer.domElement.width * 2 - 1,
        -(currentPosition.y / renderer.domElement.height) * 2 + 1
      );
      const nds = new THREE.Vector2(
        startPosition.x / renderer.domElement.width * 2 - 1,
        -(startPosition.y / renderer.domElement.height) * 2 + 1
      );
      const ray = new THREE.Raycaster();
      ray.setFromCamera(ndc, camera);
      ray.ray.intersectPlane(temp.plane, temp.v1_1);
      ray.setFromCamera(nds, camera);
      ray.ray.intersectPlane(temp.plane, temp.v2_2);
      temp.v3.subVectors(temp.v1_1, temp.v2_2);
      if (enableRotationCompensation && model) {
        model.getWorldQuaternion(temp.quat).invert();
        temp.v3.applyQuaternion(temp.quat);
      }
      obj.position.add(temp.v3);
      onDrag?.(obj, temp.v3);
    },
    [
      model,
      camera,
      temp.v1,
      temp.v2,
      temp.plane,
      temp.v1_1,
      temp.v2_2,
      temp.v3,
      temp.quat,
      renderer.domElement.width,
      renderer.domElement.height,
      enableRotationCompensation,
      onDrag
    ]
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
          handleDrag(event.object, event.currentPosition, event.startPosition);
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
      onEvent: eventHandler
      //enabled: isEnabled,
    }),
    [model, eventHandler]
  );
  const factory = useCallback(
    () => new AdvancedRaycasterPlugin(null, void 0),
    []
  );
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
  const setEnabledCallback = useCallback(
    (value) => setIsEnabled(value),
    []
  );
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
