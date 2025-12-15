import {
  useScene
} from "./chunk-KHCQXOKB.js";
import {
  AdvancedRaycasterPlugin
} from "./chunk-RHWTPFHQ.js";
import {
  useActiveModel
} from "./chunk-MGCTEPFA.js";
import {
  THREE
} from "./chunk-OVHQQSEK.js";

// src/react/components/AdvancedDragRaycaster.tsx
import { useEffect, useState, useRef } from "react";
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
  transitionDuration = 0,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const orchestrator = useScene();
  const activeModel = useActiveModel();
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isResetting, setIsResetting] = useState(false);
  const dragState = useRef({
    isDragging: false,
    startPosition: new THREE.Vector2(),
    currentObject: null
  });
  const originalStates = useRef(/* @__PURE__ */ new Map());
  useEffect(() => {
    if (!orchestrator) {
      return;
    }
    if (!activeModel || !orchestrator.camera) {
      return;
    }
    const camera = orchestrator.camera;
    if (orchestrator.has("AdvancedRaycaster")) {
      return;
    }
    orchestrator.use(
      new AdvancedRaycasterPlugin(activeModel, (event) => {
        const state = dragState.current;
        switch (event.type) {
          case "objectdragstart":
            state.isDragging = true;
            state.currentObject = event.object;
            state.startPosition.copy(event.startPosition);
            if (state.currentObject && !originalStates.current.has(state.currentObject)) {
              originalStates.current.set(state.currentObject, {
                position: state.currentObject.position.clone(),
                quaternion: state.currentObject.quaternion.clone()
              });
            }
            onDragStart?.(event.object);
            break;
          case "objectdrag":
            if (state.isDragging && state.currentObject) {
              const delta2 = event.delta;
              tempVector3.set(delta2.x, delta2.y, 0);
              if (enableRotationCompensation && activeModel) {
                activeModel.getWorldQuaternion(tempQuaternion);
                tempQuaternion.invert();
                tempVector3.applyQuaternion(tempQuaternion);
              }
              state.currentObject.position.add(tempVector3);
              onDrag?.(state.currentObject, tempVector3.clone());
              state.startPosition.add(delta2);
            }
            break;
          case "objectdragend":
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
      orchestrator.plugin("AdvancedRaycaster").dispose?.();
      orchestrator.remove("AdvancedRaycaster");
    };
  }, [
    activeModel,
    orchestrator,
    onDragStart,
    onDrag,
    onDragEnd,
    enableRotationCompensation
  ]);
  useEffect(() => {
    if (!activeModel || !orchestrator.has("AdvancedRaycaster")) {
      return;
    }
    orchestrator.plugin("AdvancedRaycaster").manager.setModel(activeModel);
  }, [activeModel]);
  useEffect(() => {
    if (!orchestrator.has("AdvancedRaycaster")) {
      return;
    }
    orchestrator.plugin("AdvancedRaycaster").setEnabled(isEnabled);
  }, [isEnabled]);
  const toggleEnabled = () => setIsEnabled((prev) => !prev);
  const setEnabled = (value) => setIsEnabled(value);
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
  return /* @__PURE__ */ jsx(Fragment, { children: children({
    isEnabled,
    toggleEnabled,
    setEnabled,
    resetAll,
    isResetting
  }) });
};

export {
  AdvancedDragRaycaster
};
