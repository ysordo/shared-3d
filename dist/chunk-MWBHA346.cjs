"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkN4YA2OBNcjs = require('./chunk-N4YA2OBN.cjs');


var _chunkHBD5STTQcjs = require('./chunk-HBD5STTQ.cjs');


var _chunkPKNMQ6ENcjs = require('./chunk-PKNMQ6EN.cjs');


var _chunkBS6FGAC2cjs = require('./chunk-BS6FGAC2.cjs');


var _chunkEA3XQ4KJcjs = require('./chunk-EA3XQ4KJ.cjs');

// src/react/components/AdvancedDragRaycaster.tsx






var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var AdvancedDragRaycaster = ({
  children,
  defaultEnabled = true,
  enableRotationCompensation = true,
  transitionDuration = 300,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const { camera } = _chunkPKNMQ6ENcjs.useScene.call(void 0, );
  const model = _chunkBS6FGAC2cjs.useActiveModel.call(void 0, );
  const [isEnabled, setIsEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [isResetting, setIsResetting] = _react.useState.call(void 0, false);
  const rafRef = _react.useRef.call(void 0, null);
  const originalStatesRef = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  const temp = _react.useMemo.call(void 0, 
    () => ({
      v1: new _chunkEA3XQ4KJcjs.THREE.Vector3(),
      v2: new _chunkEA3XQ4KJcjs.THREE.Vector3(),
      v3: new _chunkEA3XQ4KJcjs.THREE.Vector3(),
      v2d1: new _chunkEA3XQ4KJcjs.THREE.Vector2(),
      v2d2: new _chunkEA3XQ4KJcjs.THREE.Vector2(),
      plane: new _chunkEA3XQ4KJcjs.THREE.Plane(),
      quat: new _chunkEA3XQ4KJcjs.THREE.Quaternion(),
      ray: new _chunkEA3XQ4KJcjs.THREE.Raycaster()
    }),
    []
  );
  const handleDragStart = _react.useCallback.call(void 0, 
    (obj) => {
      if (!originalStatesRef.current.has(obj)) {
        originalStatesRef.current.set(obj, {
          position: obj.position.clone(),
          quaternion: obj.quaternion.clone()
        });
      }
      _optionalChain([onDragStart, 'optionalCall', _ => _(obj)]);
    },
    [onDragStart]
  );
  const handleDrag = _react.useCallback.call(void 0, 
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
      _optionalChain([onDrag, 'optionalCall', _2 => _2(obj, worldDelta)]);
    },
    [onDrag, camera, model, enableRotationCompensation, temp]
  );
  const handleDragEnd = _react.useCallback.call(void 0, 
    (obj) => {
      _optionalChain([onDragEnd, 'optionalCall', _3 => _3(obj)]);
    },
    [onDragEnd]
  );
  const eventHandler = _react.useCallback.call(void 0, 
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
  const factory = _react.useCallback.call(void 0, () => {
    if (!model) {
      return new (0, _chunkHBD5STTQcjs.AdvancedRaycasterPlugin)(new _chunkEA3XQ4KJcjs.THREE.Object3D(), () => {
      });
    }
    return new (0, _chunkHBD5STTQcjs.AdvancedRaycasterPlugin)(model, eventHandler);
  }, [model, eventHandler]);
  const plugin = _chunkN4YA2OBNcjs.usePlugin.call(void 0, factory, []);
  _react.useEffect.call(void 0, () => {
    if (model) {
      _optionalChain([plugin, 'optionalAccess', _4 => _4.update, 'call', _5 => _5(model, eventHandler)]);
    }
  }, [model, eventHandler, plugin]);
  _react.useEffect.call(void 0, () => {
    if (_optionalChain([plugin, 'optionalAccess', _6 => _6.manager])) {
      plugin.manager.setEnabled(isEnabled);
    }
  }, [plugin, isEnabled]);
  const resetAll = _react.useCallback.call(void 0, () => {
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
  _react.useEffect.call(void 0, () => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  const toggleEnabled = _react.useCallback.call(void 0, () => setIsEnabled((prev) => !prev), []);
  const setEnabled = _react.useCallback.call(void 0, (value) => setIsEnabled(value), []);
  const controlState = _react.useMemo.call(void 0, 
    () => ({
      isEnabled,
      toggleEnabled,
      setEnabled,
      resetAll,
      isResetting
    }),
    [isEnabled, toggleEnabled, setEnabled, resetAll, isResetting]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: _optionalChain([children, 'optionalCall', _7 => _7(controlState)]) });
};



exports.AdvancedDragRaycaster = AdvancedDragRaycaster;
