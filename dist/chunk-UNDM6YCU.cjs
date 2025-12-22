"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk4EDX5W2Jcjs = require('./chunk-4EDX5W2J.cjs');

// src/context/SceneContext.tsx








var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var SceneContext = _react.createContext.call(void 0, null);
var SceneProvider = _react.forwardRef.call(void 0, 
  ({ children, config }, ref) => {
    const [orchestrator, setOrchestrator] = _react.useState.call(void 0, 
      null
    );
    const [activeModel, setActiveModel] = _react.useState.call(void 0, null);
    const preload = _react.useRef.call(void 0, /* @__PURE__ */ new Map());
    _react.useEffect.call(void 0, () => {
      if (!ref || !ref.current) {
        return;
      }
      if (orchestrator) {
        return;
      }
      const canvas = ref.current;
      const orch = _chunk4EDX5W2Jcjs.SceneOrchestrator.getInstance(canvas, config);
      setOrchestrator(orch);
      const updateActiveModel = (e) => setActiveModel(_nullishCoalesce(_optionalChain([e, 'optionalAccess', _ => _.model]), () => ( null)));
      orch.addEventListener("model::loaded", updateActiveModel);
      orch.addEventListener("model::removed", updateActiveModel);
      return () => {
        orch.removeEventListener("model::loaded", updateActiveModel);
        orch.removeEventListener("model::removed", updateActiveModel);
      };
    }, [ref, config]);
    const value = _react.useMemo.call(void 0, () => {
      if (!orchestrator) {
        return null;
      }
      return {
        orchestrator,
        activeModel,
        preload: preload.current
      };
    }, [orchestrator, activeModel]);
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SceneContext.Provider, { value, children });
  }
);
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
