"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkKD4SYTBBcjs = require('./chunk-KD4SYTBB.cjs');

// src/context/SceneContext.tsx






var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var SceneContext = _react.createContext.call(void 0, null);
var SceneProvider = ({
  children,
  config,
  canvasRef
}) => {
  const orchestratorRef = _react.useRef.call(void 0, null);
  const activeModelRef = _react.useRef.call(void 0, null);
  const preloadRef = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
  _react.useEffect.call(void 0, () => {
    if (!canvasRef.current || orchestratorRef.current) {
      return;
    }
    const orchestrator = _chunkKD4SYTBBcjs.SceneOrchestrator.getInstance(
      canvasRef.current,
      config
    );
    orchestratorRef.current = orchestrator;
    const updateActiveModel = () => {
      activeModelRef.current = orchestrator.getActiveModel();
    };
    orchestrator.addEventListener("model::loaded", updateActiveModel);
    orchestrator.addEventListener("model::removed", updateActiveModel);
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
  }, [config, canvasRef]);
  const value = _react.useMemo.call(void 0, () => {
    if (!orchestratorRef.current) {
      return null;
    }
    return {
      orchestrator: orchestratorRef.current,
      activeModel: activeModelRef.current,
      preload: preloadRef.current
    };
  }, []);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SceneContext.Provider, { value, children });
};
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
