import {
  SceneOrchestrator
} from "./chunk-KBRJ6H6B.js";

// src/react/contexts/SceneContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef
} from "react";
import { jsx } from "react/jsx-runtime";
var SceneContext = createContext(void 0);
var SceneProvider = forwardRef(
  ({ children, config }, ref) => {
    const [orchestrator, setOrchestrator] = useState(null);
    const preloadRef = useRef(/* @__PURE__ */ new Map());
    const [, forceUpdate] = useState({});
    useEffect(() => {
      if (!ref || typeof ref === "function" || !ref.current || orchestrator) {
        return;
      }
      const canvas = ref.current;
      const orch = SceneOrchestrator.getInstance(canvas, config);
      setOrchestrator(orch);
    }, [ref, config, orchestrator]);
    const contextValue = useMemo(() => {
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
    return /* @__PURE__ */ jsx(SceneContext.Provider, { value: contextValue, children });
  }
);
SceneProvider.displayName = "SceneProvider";
var useSceneContext = () => {
  const context = useContext(SceneContext);
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

export {
  SceneProvider,
  useSceneContext,
  useScene,
  usePreload
};
