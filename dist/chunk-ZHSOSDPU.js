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
import { jsx } from "react/jsx-runtime";
var SceneContext = createContext(null);
var SceneProvider = forwardRef(
  ({ children, config }, ref) => {
    const orchestratorRef = useRef(null);
    const activeModelRef = useRef(null);
    const preloadRef = useRef(/* @__PURE__ */ new Map());
    useEffect(() => {
      if (!ref || orchestratorRef.current) {
        return;
      }
      if (typeof ref === "function") {
        throw new Error(
          "SceneProvider no soporta ref como funci\xF3n. Usa useRef()"
        );
      }
      if (!ref.current) {
        console.warn("SceneProvider: canvas ref no est\xE1 asignado a\xFAn");
        return;
      }
      const orchestrator = SceneOrchestrator.getInstance(ref.current, config);
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
    }, [ref, config]);
    const value = useMemo(() => {
      if (!orchestratorRef.current) {
        throw new Error(
          "SceneOrchestrator no inicializado. Aseg\xFArate de que el canvas est\xE9 montado."
        );
      }
      return {
        orchestrator: orchestratorRef.current,
        activeModel: activeModelRef.current,
        preload: preloadRef.current
      };
    }, []);
    return /* @__PURE__ */ jsx(SceneContext.Provider, { value, children });
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
