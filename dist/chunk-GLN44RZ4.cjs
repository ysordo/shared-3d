"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTS2WCK2Bcjs = require('./chunk-TS2WCK2B.cjs');

// src/context/CacheContext.tsx
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var CacheContext = _react.createContext.call(void 0, null);
var CacheProvider = ({ children }) => {
  const [status, setStatus] = _react.useState.call(void 0, "idle");
  const [progress, setProgress] = _react.useState.call(void 0, 0);
  const [report, setReport] = _react.useState.call(void 0, null);
  const validate = async (manifest) => {
    setStatus("validating");
    setProgress(0);
    const result = await _chunkTS2WCK2Bcjs.CacheValidator.validate({
      manifest,
      onProgress: (p) => setProgress(Math.round(p)),
      onComplete: (r) => {
        setReport(r);
        setStatus(r.errors.length > 0 ? "error" : "ready");
      }
    });
    return result;
  };
  const value = _react.useMemo.call(void 0, 
    () => ({ status, progress, report, validate }),
    [status, progress, report]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, CacheContext.Provider, { value, children });
};
var useCache = () => {
  const context = _react.useContext.call(void 0, CacheContext);
  if (!context) {
    throw new Error("useCache debe usarse dentro de <CacheProvider>");
  }
  return context;
};




exports.CacheProvider = CacheProvider; exports.useCache = useCache;
