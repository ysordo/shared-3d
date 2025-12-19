import {
  SceneOrchestrator
} from "./chunk-SENENRNP.js";

// src/context/SceneContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo
} from "react";
import { jsx } from "react/jsx-runtime";
var SceneContext = createContext(null);
var SceneProvider = ({
  children,
  config,
  canvasRef
}) => {
  const orchestratorRef = useRef(null);
  const activeModelRef = useRef(null);
  const preloadRef = useRef(/* @__PURE__ */ new Map());
  useEffect(() => {
    if (!canvasRef.current || orchestratorRef.current) {
      return;
    }
    const orchestrator = SceneOrchestrator.getInstance(
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
  const value = useMemo(() => {
    if (!orchestratorRef.current) {
      return null;
    }
    return {
      orchestrator: orchestratorRef.current,
      activeModel: activeModelRef.current,
      preload: preloadRef.current
    };
  }, []);
  return /* @__PURE__ */ jsx(SceneContext.Provider, { value, children });
};
var useSceneContext = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error(
      "useSceneContext must be used within a <SceneProvider>. Make sure your component is wrapped by the SceneProvider component."
    );
  }
  return context;
};

export {
  SceneProvider,
  useSceneContext
};
