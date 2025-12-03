import {
  CacheValidator
} from "./chunk-ZRBGFD3Z.js";

// src/context/CacheContext.tsx
import { createContext, useContext, useState } from "react";
import { jsx } from "react/jsx-runtime";
var CacheContext = createContext(null);
var CacheProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState(null);
  const validate = async (manifest) => {
    setStatus("validating");
    setProgress(0);
    const result = await CacheValidator.validate({
      manifest,
      onProgress: (p, msg) => {
        setProgress(Math.round(p));
        console.info(`[Cache] ${msg} (${p}%)`);
      },
      onComplete: (r) => {
        setReport(r);
        setStatus(r.errors.length > 0 ? "error" : "ready");
      }
    });
    return result;
  };
  return /* @__PURE__ */ jsx(CacheContext.Provider, { value: { status, progress, report, validate }, children });
};
var useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error("useCache debe usarse dentro de <CacheProvider>");
  }
  return context;
};

export {
  CacheProvider,
  useCache
};
