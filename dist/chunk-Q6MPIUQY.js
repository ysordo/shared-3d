import {
  usePlugin
} from "./chunk-X54D3YOP.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-OHN5TLPQ.js";
import {
  useScene
} from "./chunk-Z3ENXIV3.js";
import {
  useActiveModel
} from "./chunk-FSU35KMZ.js";
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
var tempVector1 = new THREE.Vector3();
var tempVector2 = new THREE.Vector3();
var tempVector3 = new THREE.Vector3();
var tempVector2_1 = new THREE.Vector2();
var tempVector2_2 = new THREE.Vector2();
var tempPlane = new THREE.Plane();
var tempQuaternion = new THREE.Quaternion();
var tempRaycaster = new THREE.Raycaster();
var AdvancedDragRaycaster = ({
  children,
  defaultEnabled = true,
  enableRotationCompensation = true,
  transitionDuration = 300,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const orchestrator = useScene();
  const model = useActiveModel();
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isResetting, setIsResetting] = useState(false);
  const rafRef = useRef(null);
  const dragState = useRef({
    isDragging: false,
    startPosition: new THREE.Vector2(),
    currentObject: null
  });
  const originalStates = useRef(/* @__PURE__ */ new Map());
  const handleDragStart = useCallback(
    (obj, startPosition) => {
      const state2 = dragState.current;
      state2.isDragging = true;
      state2.currentObject = obj;
      state2.startPosition.copy(startPosition);
      if (state2.currentObject && !originalStates.current.has(state2.currentObject)) {
        originalStates.current.set(state2.currentObject, {
          position: state2.currentObject.position.clone(),
          quaternion: state2.currentObject.quaternion.clone()
        });
      }
      onDragStart?.(obj);
    },
    [onDragStart]
  );
  const handleDrag = useCallback(
    (current) => {
      if (!orchestrator) {
        return;
      }
      const state2 = dragState.current;
      const camera = orchestrator.camera;
      if (state2.isDragging && state2.currentObject) {
        state2.currentObject.getWorldPosition(tempVector1);
        camera.getWorldDirection(tempVector2);
        tempPlane.setFromNormalAndCoplanarPoint(tempVector2, tempVector1);
        tempVector2_1.set(
          current.x / window.innerWidth * 2 - 1,
          -(current.y / window.innerHeight) * 2 + 1
        );
        tempVector2_2.set(
          state2.startPosition.x / window.innerWidth * 2 - 1,
          -(state2.startPosition.y / window.innerHeight) * 2 + 1
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
          state2.currentObject.position.add(tempVector3);
          onDrag?.(
            state2.currentObject,
            new THREE.Vector2(...tempVector3.clone())
          );
        }
        state2.startPosition.copy(current);
      }
    },
    [onDrag, orchestrator]
  );
  const handleDragEnd = useCallback(() => {
    const state2 = dragState.current;
    if (state2.isDragging && state2.currentObject) {
      onDragEnd?.(state2.currentObject);
    }
    state2.isDragging = false;
    state2.currentObject = null;
  }, [onDragEnd]);
  const config = useMemo(
    () => ({
      model,
      enableRotationCompensation,
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd
    }),
    [
      model,
      enableRotationCompensation,
      handleDragStart,
      handleDrag,
      handleDragEnd
    ]
  );
  usePlugin(
    () => new AdvancedRaycasterPlugin(
      config.model,
      (event) => {
        switch (event.type) {
          case "objectdragstart": {
            handleDragStart(event.object, event.startPosition);
            break;
          }
          case "objectdrag": {
            handleDrag(event.current);
            break;
          }
          case "objectdragend": {
            handleDragEnd();
            break;
          }
        }
      }
    ),
    [...Object.values(config), orchestrator]
  );
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    const plugin = orchestrator.plugin("AdvancedRaycaster");
    if (!plugin) {
      return;
    }
    plugin.manager.setEnabled(isEnabled);
  }, [isEnabled, orchestrator]);
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
      originalStates.current.forEach((state2, obj) => {
        obj.position.lerp(state2.position, t);
        obj.quaternion.slerp(state2.quaternion, t);
      });
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsResetting(false);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }, [isResetting, transitionDuration, orchestrator]);
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  const toggleEnabled = useCallback(() => setIsEnabled((prev) => !prev), []);
  const setEnabledWrapper = useCallback(
    (value) => setIsEnabled(value),
    []
  );
  const state = useMemo(
    () => ({
      isEnabled,
      toggleEnabled,
      setEnabled: setEnabledWrapper,
      resetAll,
      isResetting
    }),
    [isEnabled, toggleEnabled, setEnabledWrapper, resetAll, isResetting]
  );
  return /* @__PURE__ */ jsx(Fragment, { children: children?.(state) });
};

export {
  AdvancedDragRaycaster
};
