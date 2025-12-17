import {
  CacheValidator
} from "./chunk-NQSGSI4W.js";

// src/context/CacheContext.tsx
import { createContext, useContext, useMemo, useState } from "react";
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
      onProgress: (p) => setProgress(Math.round(p)),
      onComplete: (r) => {
        setReport(r);
        setStatus(r.errors.length > 0 ? "error" : "ready");
      }
    });
    return result;
  };
  const value = useMemo(
    () => ({ status, progress, report, validate }),
    [status, progress, report]
  );
  return /* @__PURE__ */ jsx(CacheContext.Provider, { value, children });
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
