import {
  SceneOrchestrator
} from "./chunk-SENENRNP.js";

// src/context/SceneContext.tsx
import {
  createContext,
  useContext,
  forwardRef,
  useEffect,
  useRef,
  useMemo
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var SceneContext = createContext(null);
var SceneProvider = forwardRef(
  ({ children, config, canvasRef }, forwardedRef) => {
    const internalCanvasRef = useRef(null);
    const canvas = (canvasRef ?? internalCanvasRef).current;
    const orchestratorRef = useRef(null);
    const activeModelRef = useRef(null);
    const preloadRef = useRef(/* @__PURE__ */ new Map());
    useEffect(() => {
      if (!canvas || orchestratorRef.current) {
        return;
      }
      const orchestrator = SceneOrchestrator.getInstance(canvas, config);
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
    }, [canvas, config]);
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
    return /* @__PURE__ */ jsxs(SceneContext.Provider, { value, children: [
      /* @__PURE__ */ jsx("canvas", { ref: forwardedRef ?? internalCanvasRef }),
      children
    ] });
  }
);
SceneProvider.displayName = "SceneProvider";
var useSceneContext = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene debe usarse dentro de <SceneProvider>");
  }
  return context;
};

export {
  SceneProvider,
  useSceneContext
};
