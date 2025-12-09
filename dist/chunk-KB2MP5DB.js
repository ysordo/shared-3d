import {
  AdvancedRaycasterPlugin
} from "./chunk-NNMHNVZD.js";
import {
  useScene
} from "./chunk-DNUS32TF.js";
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
  const activeModel = orchestrator.getActiveModel();
  const camera = orchestrator.camera;
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isResetting, setIsResetting] = useState(false);
  const [plugin, setPlugin] = useState(null);
  const originalStates = useRef(/* @__PURE__ */ new Map());
  useEffect(() => {
    if (!activeModel || !camera) {
      return;
    }
    const newPlugin = new AdvancedRaycasterPlugin(activeModel, (event) => {
      if (!isEnabled) {
        return;
      }
      let isDragging = false;
      let startPosition = new THREE.Vector2();
      let currentObject = null;
      switch (event.type) {
        case "objectdragstart":
          isDragging = true;
          currentObject = event.object;
          startPosition.copy(event.startPosition);
          if (currentObject && !originalStates.current.has(currentObject)) {
            originalStates.current.set(currentObject, {
              position: currentObject.position.clone(),
              quaternion: currentObject.quaternion.clone()
            });
          }
          onDragStart?.(event.object);
          break;
        case "objectdrag":
          if (isDragging && currentObject) {
            currentObject.getWorldPosition(tempVector1);
            camera.getWorldDirection(tempVector2);
            tempPlane.setFromNormalAndCoplanarPoint(tempVector2, tempVector1);
            tempVector2_1.set(
              event.currentPosition.x / window.innerWidth * 2 - 1,
              -(event.currentPosition.y / window.innerHeight) * 2 + 1
            );
            tempVector2_2.set(
              startPosition.x / window.innerWidth * 2 - 1,
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
              currentObject.position.add(tempVector3);
              onDrag?.(currentObject, tempVector3.clone());
            }
            startPosition.copy(event.currentPosition);
          }
          break;
        case "objectdragend":
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
    enableRotationCompensation
  ]);
  useEffect(() => {
    plugin?.manager.setEnabled(isEnabled);
  }, [plugin, isEnabled]);
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
