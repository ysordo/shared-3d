"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkKD4SYTBBcjs = require('./chunk-KD4SYTBB.cjs');

// src/context/SceneContext.tsx








var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var SceneContext = _react.createContext.call(void 0, null);
var DefaultCanvas = _react.forwardRef.call(void 0, 
  (props, ref) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "canvas", { ref, ...props })
);
var SceneProvider = _react.forwardRef.call(void 0, 
  ({ children, Canvas = DefaultCanvas, config, fallback = null }, ref) => {
    const [orchestrator, setOrchestrator] = _react.useState.call(void 0, 
      null
    );
    const [activeModel, setActiveModel] = _react.useState.call(void 0, null);
    const preload = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
    _react.useEffect.call(void 0, () => {
      if (!ref || !ref.current) {
        return;
      }
      if (orchestrator) {
        return;
      }
      const canvas = ref.current;
      const orch = _chunkKD4SYTBBcjs.SceneOrchestrator.getInstance(canvas, config);
      setOrchestrator(orch);
      const updateActiveModel = () => setActiveModel(orch.getActiveModel());
      orch.addEventListener("model::loaded", updateActiveModel);
      orch.addEventListener("model::removed", updateActiveModel);
      return () => {
        orch.removeEventListener("model::loaded", updateActiveModel);
        orch.removeEventListener("model::removed", updateActiveModel);
      };
    }, [ref, config]);
    const value = _react.useMemo.call(void 0, () => {
      if (!orchestrator) {
        return null;
      }
      return {
        orchestrator,
        activeModel,
        preload: preload.current
      };
    }, [orchestrator, activeModel]);
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, SceneContext.Provider, { value, children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Canvas, { ref }),
      value ? children : fallback
    ] });
  }
);
var useSceneContext = () => {
  const context = _react.useContext.call(void 0, SceneContext);
  if (!context) {
    throw new Error(
      "useSceneContext must be used within a <SceneProvider>. Make sure your component is wrapped by the SceneProvider component."
    );
  }
  return context;
};




exports.SceneProvider = SceneProvider; exports.useSceneContext = useSceneContext;
