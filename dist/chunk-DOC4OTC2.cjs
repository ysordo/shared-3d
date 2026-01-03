"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk76BBOGQKcjs = require('./chunk-76BBOGQK.cjs');


var _chunkEC2ZLY2Vcjs = require('./chunk-EC2ZLY2V.cjs');


var _chunk7J7CBFY2cjs = require('./chunk-7J7CBFY2.cjs');


var _chunkPWY2ROIAcjs = require('./chunk-PWY2ROIA.cjs');


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
  const { camera, renderer } = _chunk7J7CBFY2cjs.useScene.call(void 0, );
  const model = _chunk76BBOGQKcjs.useActiveModel.call(void 0, );
  const [isEnabled, setIsEnabled] = _react.useState.call(void 0, defaultEnabled);
  const [isResetting, setIsResetting] = _react.useState.call(void 0, false);
  const rafRef = _react.useRef.call(void 0, null);
  const originalStatesRef = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  const temp = _react.useMemo.call(void 0, 
    () => ({
      v1: new _chunkEA3XQ4KJcjs.THREE.Vector3(),
      v2: new _chunkEA3XQ4KJcjs.THREE.Vector3(),
      v3: new _chunkEA3XQ4KJcjs.THREE.Vector3(),
      v1_1: new _chunkEA3XQ4KJcjs.THREE.Vector3(),
      v2_2: new _chunkEA3XQ4KJcjs.THREE.Vector3(),
      plane: new _chunkEA3XQ4KJcjs.THREE.Plane(),
      quat: new _chunkEA3XQ4KJcjs.THREE.Quaternion()
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
    (obj, currentPosition, startPosition) => {
      if (!model || !camera) {
        return;
      }
      obj.getWorldPosition(temp.v1);
      camera.getWorldDirection(temp.v2);
      temp.plane.setFromNormalAndCoplanarPoint(temp.v2.negate(), temp.v1);
      const ndc = new _chunkEA3XQ4KJcjs.THREE.Vector2(
        currentPosition.x / renderer.domElement.width * 2 - 1,
        -(currentPosition.y / renderer.domElement.height) * 2 + 1
      );
      const nds = new _chunkEA3XQ4KJcjs.THREE.Vector2(
        startPosition.x / renderer.domElement.width * 2 - 1,
        -(startPosition.y / renderer.domElement.height) * 2 + 1
      );
      const ray = new _chunkEA3XQ4KJcjs.THREE.Raycaster();
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
      _optionalChain([onDrag, 'optionalCall', _2 => _2(obj, temp.v3)]);
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
          handleDrag(event.object, event.currentPosition, event.startPosition);
          break;
        case "objectdragend":
          handleDragEnd(event.object);
          break;
      }
    },
    [handleDragStart, handleDrag, handleDragEnd]
  );
  const config = _react.useMemo.call(void 0, 
    () => ({
      model: _nullishCoalesce(model, () => ( null)),
      onEvent: eventHandler
      //enabled: isEnabled,
    }),
    [model, eventHandler]
  );
  const factory = _react.useCallback.call(void 0, 
    () => new (0, _chunkPWY2ROIAcjs.AdvancedRaycasterPlugin)(null, void 0),
    []
  );
  const plugin = _chunkEC2ZLY2Vcjs.usePlugin.call(void 0, factory, config);
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
  const setEnabledCallback = _react.useCallback.call(void 0, 
    (value) => setIsEnabled(value),
    []
  );
  const controlState = _react.useMemo.call(void 0, 
    () => ({
      isEnabled,
      toggleEnabled,
      setEnabled: setEnabledCallback,
      resetAll,
      isResetting
    }),
    [isEnabled, toggleEnabled, setEnabledCallback, resetAll, isResetting]
  );
  _react.useEffect.call(void 0, () => {
    _optionalChain([plugin, 'optionalAccess', _4 => _4.setEnabled, 'call', _5 => _5(isEnabled)]);
  }, [isEnabled, plugin]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children: _optionalChain([children, 'optionalCall', _6 => _6(controlState)]) });
};



exports.AdvancedDragRaycaster = AdvancedDragRaycaster;
