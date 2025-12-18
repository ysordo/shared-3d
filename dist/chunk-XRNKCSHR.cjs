"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkKD4SYTBBcjs = require('./chunk-KD4SYTBB.cjs');

// src/context/SceneContext.tsx







var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var SceneContext = _react.createContext.call(void 0, null);
var SceneProvider = _react.forwardRef.call(void 0, 
  ({ children, config, ...props }, forwardedRef) => {
    const internalCanvasRef = _react.useRef.call(void 0, null);
    const orchestratorRef = _react.useRef.call(void 0, null);
    const activeModelRef = _react.useRef.call(void 0, null);
    const preloadRef = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
    _react.useEffect.call(void 0, () => {
      const canvas = (_nullishCoalesce(forwardedRef, () => ( internalCanvasRef))).current;
      if (!canvas || orchestratorRef.current) {
        return;
      }
      const orchestrator = _chunkKD4SYTBBcjs.SceneOrchestrator.getInstance(canvas, config);
      orchestratorRef.current = orchestrator;
      const updateActiveModel = () => {
        activeModelRef.current = orchestrator.getActiveModel();
      };
      orchestrator.addEventListener(
        "model::loaded",
        updateActiveModel
      );
      orchestrator.addEventListener(
        "model::removed",
        updateActiveModel
      );
      if (process.env.NODE_ENV === "development") {
        window.__ORCHESTRATOR__ = orchestratorRef.current;
      }
      return () => {
        orchestrator.removeEventListener(
          "model::loaded",
          updateActiveModel
        );
        orchestrator.removeEventListener(
          "model::removed",
          updateActiveModel
        );
        orchestrator.dispose();
        orchestratorRef.current = null;
        activeModelRef.current = null;
        preloadRef.current.clear();
      };
    }, [config, forwardedRef, internalCanvasRef]);
    const value = _react.useMemo.call(void 0, () => {
      if (!orchestratorRef.current) {
        return null;
      }
      return {
        orchestrator: orchestratorRef.current,
        activeModel: activeModelRef.current,
        preload: preloadRef.current
      };
    }, [orchestratorRef]);
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, SceneContext.Provider, { value, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "canvas", { ref: _nullishCoalesce(forwardedRef, () => ( internalCanvasRef)), ...props }),
      children
    ] });
  }
);
SceneProvider.displayName = "SceneProvider";
var useSceneContext = () => {
  const context = _react.useContext.call(void 0, SceneContext);
  return context;
};




exports.SceneProvider = SceneProvider; exports.useSceneContext = useSceneContext;
