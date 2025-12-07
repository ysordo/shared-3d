import {
  SceneOrchestrator
} from "./chunk-H2O5XIYF.js";

// src/context/SceneContext.tsx
import { createContext, useContext, forwardRef, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
var SceneContext = createContext(null);
var SceneProvider = forwardRef(
  ({ children, config }, ref) => {
    const [orchestrator, setOrchestrator] = useState(null);
    useEffect(() => {
      if (!ref) {
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
      setOrchestrator((prev) => {
        if (prev) {
          return prev;
        }
        return SceneOrchestrator.getInstance(ref.current ?? void 0, config);
      });
      if (process.env.NODE_ENV === "development") {
        window.__ORCHESTRATOR__ = orchestrator;
      }
    }, [ref, config]);
    return /* @__PURE__ */ jsx(SceneContext.Provider, { value: { orchestrator }, children });
  }
);
SceneProvider.displayName = "SceneProvider";
var useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene debe usarse dentro de <SceneProvider>");
  }
  if (!context.orchestrator) {
    throw new Error(
      "SceneOrchestrator a\xFAn no est\xE1 inicializado. Aseg\xFArate de que el canvas est\xE9 montado"
    );
  }
  return context.orchestrator;
};

export {
  SceneProvider,
  useScene
};
