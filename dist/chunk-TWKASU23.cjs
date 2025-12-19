"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkDLJXBVOIcjs = require('./chunk-DLJXBVOI.cjs');


var _chunkHPHYHDPRcjs = require('./chunk-HPHYHDPR.cjs');


var _chunkL3KVNMIIcjs = require('./chunk-L3KVNMII.cjs');


var _chunk2V6BPD4Xcjs = require('./chunk-2V6BPD4X.cjs');


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
  transitionDuration = 300,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const { camera } = _chunkL3KVNMIIcjs.useScene.call(void 0, );
  const model = _chunk2V6BPD4Xcjs.useActiveModel.call(void 0, );
  const [isEnabled, setIsEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [isResetting, setIsResetting] = _react.useState.call(void 0, false);
  const rafRef = _react.useRef.call(void 0, null);
  const dragState = _react.useRef.call(void 0, {
    isDragging: false,
    startPosition: new _chunkEA3XQ4KJcjs.THREE.Vector2(),
    currentObject: null
  });
  const originalStates = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  const handleDragStart = _react.useCallback.call(void 0, 
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
      _optionalChain([onDragStart, 'optionalCall', _ => _(obj)]);
    },
    [onDragStart]
  );
  const handleDrag = _react.useCallback.call(void 0, 
    (current) => {
      const state2 = dragState.current;
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
          _optionalChain([onDrag, 'optionalCall', _2 => _2(
            state2.currentObject,
            new _chunkEA3XQ4KJcjs.THREE.Vector2(...tempVector3.clone())
          )]);
        }
        state2.startPosition.copy(current);
      }
    },
    [onDrag]
  );
  const handleDragEnd = _react.useCallback.call(void 0, () => {
    const state2 = dragState.current;
    if (state2.isDragging && state2.currentObject) {
      _optionalChain([onDragEnd, 'optionalCall', _3 => _3(state2.currentObject)]);
    }
    state2.isDragging = false;
    state2.currentObject = null;
  }, [onDragEnd]);
  const handle = _react.useCallback.call(void 0, 
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
    },
    [handleDragStart, handleDrag, handleDragEnd]
  );
  const deps = _react.useMemo.call(void 0, 
    () => [model, enableRotationCompensation, handle, camera],
    [model, enableRotationCompensation, handle, camera]
  );
  const plugin = _chunkDLJXBVOIcjs.usePlugin.call(void 0, 
    new (0, _chunkHPHYHDPRcjs.AdvancedRaycasterPlugin)(model, handle),
    deps
  );
  _react.useEffect.call(void 0, () => {
    if (!plugin) {
      return;
    }
    plugin.manager.setEnabled(isEnabled);
  }, [isEnabled, plugin]);
  const resetAll = _react.useCallback.call(void 0, () => {
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
  }, [isResetting, transitionDuration]);
  _react.useEffect.call(void 0, () => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  const toggleEnabled = _react.useCallback.call(void 0, () => setIsEnabled((prev) => !prev), []);
  const setEnabledWrapper = _react.useCallback.call(void 0, 
    (value) => setIsEnabled(value),
    []
  );
  const state = _react.useMemo.call(void 0, 
    () => ({
      isEnabled,
      toggleEnabled,
      setEnabled: setEnabledWrapper,
      resetAll,
      isResetting
    }),
    [isEnabled, toggleEnabled, setEnabledWrapper, resetAll, isResetting]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: _optionalChain([children, 'optionalCall', _4 => _4(state)]) });
};



exports.AdvancedDragRaycaster = AdvancedDragRaycaster;
