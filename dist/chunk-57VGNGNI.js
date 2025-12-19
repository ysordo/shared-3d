import {
  SceneOrchestrator
} from "./chunk-SENENRNP.js";

// src/context/SceneContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef
} from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var SceneContext = createContext(null);
var SceneProvider = forwardRef(
  ({ children, config, fallback = null }, ref) => {
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
        orch.dispose();
      };
    }, [ref, config]);
    if (!orchestrator) {
      return /* @__PURE__ */ jsx(Fragment, { children: fallback });
    }
    return /* @__PURE__ */ jsx(
      SceneContext.Provider,
      {
        value: {
          activeModel,
          orchestrator,
          preload: preload.current
        },
        children
      }
    );
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
