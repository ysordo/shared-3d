import {
  SceneOrchestrator
} from "./chunk-IMB2POSX.js";

// src/context/SceneContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState,
  forwardRef
} from "react";
import { jsx } from "react/jsx-runtime";
var SceneContext = createContext(null);
var SceneProvider = forwardRef(
  ({ children, config }, ref) => {
    const [orchestrator, setOrchestrator] = useState(
      null
    );
    const [activeModel, setActiveModel] = useState(null);
    const preload = useRef(/* @__PURE__ */ new Map());
    useEffect(() => {
      if (!ref || !ref.current) {
        return;
      }
      if (orchestrator) {
        return;
      }
      const canvas = ref.current;
      const orch = SceneOrchestrator.getInstance(canvas, config);
      setOrchestrator(orch);
      const updateActiveModel = () => setActiveModel(orch.getActiveModel());
      orch.addEventListener("model::loaded", updateActiveModel);
      orch.addEventListener("model::removed", updateActiveModel);
      return () => {
        orch.removeEventListener("model::loaded", updateActiveModel);
        orch.removeEventListener("model::removed", updateActiveModel);
      };
    }, [ref, config]);
    const value = useMemo(() => {
      if (!orchestrator) {
        return null;
      }
      return {
        orchestrator,
        activeModel,
        preload: preload.current
      };
    }, [orchestrator, activeModel]);
    return /* @__PURE__ */ jsx(SceneContext.Provider, { value, children });
  }
);
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
