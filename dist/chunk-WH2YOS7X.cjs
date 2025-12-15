"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkVRE7SNBYcjs = require('./chunk-VRE7SNBY.cjs');


var _chunkH665QQ43cjs = require('./chunk-H665QQ43.cjs');


var _chunkN5F52EFEcjs = require('./chunk-N5F52EFE.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/AdvancedDragRaycaster.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var tempVector1 = new _chunkEA3XQ4KJcjs.THREE.Vector3();
var tempVector2 = new _chunkEA3XQ4KJcjs.THREE.Vector3();
var tempVector3 = new _chunkEA3XQ4KJcjs.THREE.Vector3();
var tempVector2_1 = new _chunkEA3XQ4KJcjs.THREE.Vector2();
var tempVector2_2 = new _chunkEA3XQ4KJcjs.THREE.Vector2();
var tempPlane = new _chunkEA3XQ4KJcjs.THREE.Plane();
var tempQuaternion = new _chunkEA3XQ4KJcjs.THREE.Quaternion();
var tempRaycaster = new _chunkEA3XQ4KJcjs.THREE.Raycaster();
var AdvancedDragRaycaster = ({
  children,
  defaultEnabled = true,
  enableRotationCompensation = true,
  transitionDuration = 0,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const orchestrator = _chunkVRE7SNBYcjs.useScene.call(void 0, );
  const activeModel = _chunkN5F52EFEcjs.useActiveModel.call(void 0, );
  const [isEnabled, setIsEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [isResetting, setIsResetting] = _react.useState.call(void 0, false);
  const originalStates = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  _react.useEffect.call(void 0, () => {
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
      new (0, _chunkH665QQ43cjs.AdvancedRaycasterPlugin)(activeModel, (event) => {
        if (!isEnabled) {
          return;
        }
        let isDragging = false;
        let startPosition = new _chunkEA3XQ4KJcjs.THREE.Vector2();
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
            _optionalChain([onDragStart, 'optionalCall', _ => _(event.object)]);
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
                _optionalChain([onDrag, 'optionalCall', _2 => _2(currentObject, tempVector3.clone())]);
              }
              startPosition.copy(event.currentPosition);
            }
            break;
          case "objectdragend":
            if (isDragging) {
              _optionalChain([onDragEnd, 'optionalCall', _3 => _3(event.object)]);
            }
            break;
        }
      })
    );
    return () => {
      _optionalChain([orchestrator, 'access', _4 => _4.plugin, 'call', _5 => _5("AdvancedRaycaster"), 'access', _6 => _6.dispose, 'optionalCall', _7 => _7()]);
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
  _react.useEffect.call(void 0, () => {
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: children({
    isEnabled,
    toggleEnabled,
    setEnabled,
    resetAll,
    isResetting
  }) });
};



exports.AdvancedDragRaycaster = AdvancedDragRaycaster;
