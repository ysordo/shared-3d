"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkN7NMY3OPcjs = require('./chunk-N7NMY3OP.cjs');

// src/context/SceneContext.tsx








var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var SceneContext = _react.createContext.call(void 0, void 0);
var SceneProvider = _react.forwardRef.call(void 0, 
  ({ children, config }, ref) => {
    const [orchestrator, setOrchestrator] = _react.useState.call(void 0, null);
    const preloadRef = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
    const [, forceUpdate] = _react.useState.call(void 0, {});
    _react.useEffect.call(void 0, () => {
      if (!ref || typeof ref === "function" || !ref.current || orchestrator) {
        return;
      }
      const canvas = ref.current;
      const orch = _chunkN7NMY3OPcjs.SceneOrchestrator.getInstance(canvas, config);
      setOrchestrator(orch);
    }, [ref, config, orchestrator]);
    const contextValue = _react.useMemo.call(void 0, () => {
      if (!orchestrator) {
        return void 0;
      }
      const preloadModel = (id, model) => {
        preloadRef.current.set(id, model);
        forceUpdate({});
      };
      const removePreloaded = (id) => {
        preloadRef.current.delete(id);
        forceUpdate({});
      };
      const getPreloaded = (id) => preloadRef.current.get(id);
      const preloadedModels = new Map(preloadRef.current);
      return {
        orchestrator,
        preloadModel,
        removePreloaded,
        getPreloaded,
        preloadedModels: Object.freeze(preloadedModels)
      };
    }, [orchestrator]);
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SceneContext.Provider, { value: contextValue, children });
  }
);
SceneProvider.displayName = "SceneProvider";
var useSceneContext = () => {
  const context = _react.useContext.call(void 0, SceneContext);
  if (!context) {
    throw new Error("useSceneContext must be used within a SceneProvider");
  }
  return context;
};
var useScene = () => useSceneContext().orchestrator;
var usePreload = () => {
  const { preloadModel, removePreloaded, getPreloaded, preloadedModels } = useSceneContext();
  return { preloadModel, removePreloaded, getPreloaded, preloadedModels };
};






exports.SceneProvider = SceneProvider; exports.useSceneContext = useSceneContext; exports.useScene = useScene; exports.usePreload = usePreload;
