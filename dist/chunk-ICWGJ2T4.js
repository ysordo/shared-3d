import {
  SceneOrchestrator
} from "./chunk-SENENRNP.js";

// src/context/SceneContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState
} from "react";
import { jsx } from "react/jsx-runtime";
var SceneContext = createContext(null);
var SceneProvider = ({
  children,
  config,
  canvasRef
}) => {
  const [orchestratorRef, setOrchestratorRef] = useState(null);
  const activeModelRef = useRef(null);
  const preloadRef = useRef(/* @__PURE__ */ new Map());
  useEffect(() => {
    if (!canvasRef.current || orchestratorRef) {
      return;
    }
    const orchestrator = SceneOrchestrator.getInstance(
      canvasRef.current,
      config
    );
    setOrchestratorRef(orchestrator);
    const updateActiveModel = () => {
      activeModelRef.current = orchestrator.getActiveModel();
    };
    orchestrator.addEventListener("model::loaded", updateActiveModel);
    orchestrator.addEventListener("model::removed", updateActiveModel);
    if (process.env.NODE_ENV === "development") {
      window.__ORCHESTRATOR__ = orchestratorRef;
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
      setOrchestratorRef(null);
      activeModelRef.current = null;
      preloadRef.current.clear();
    };
  }, [config, canvasRef]);
  const value = useMemo(() => {
    if (!orchestratorRef) {
      return null;
    }
    return {
      orchestrator: orchestratorRef,
      activeModel: activeModelRef.current,
      preload: preloadRef.current
    };
  }, [orchestratorRef]);
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
