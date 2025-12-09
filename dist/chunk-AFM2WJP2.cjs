"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkEHX6QSD4cjs = require('./chunk-EHX6QSD4.cjs');

// src/context/SceneContext.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var SceneContext = _react.createContext.call(void 0, null);
var SceneProvider = _react.forwardRef.call(void 0, 
  ({ children, config }, ref) => {
    const [orchestrator, setOrchestrator] = _react.useState.call(void 0, null);
    _react.useEffect.call(void 0, () => {
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
        return _chunkEHX6QSD4cjs.SceneOrchestrator.getInstance(_nullishCoalesce(ref.current, () => ( void 0)), config);
      });
      if (process.env.NODE_ENV === "development") {
        window.__ORCHESTRATOR__ = orchestrator;
      }
    }, [ref, config]);
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SceneContext.Provider, { value: { orchestrator }, children });
  }
);
SceneProvider.displayName = "SceneProvider";
var useScene = () => {
  const context = _react.useContext.call(void 0, SceneContext);
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




exports.SceneProvider = SceneProvider; exports.useScene = useScene;
