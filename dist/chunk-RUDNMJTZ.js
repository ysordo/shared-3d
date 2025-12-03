// src/react/components/Suspense.tsx
import { Suspense as SuspenseReact } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Suspense = ({
  children,
  fallback,
  loadingMessage = "Loading 3D model..."
}) => {
  const defaultFallback = /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-900/90 border border-gray-700 rounded-xl p-8 shadow-2xl text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold text-white", children: loadingMessage }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-2", children: "This may take a few seconds..." })
  ] }) });
  return /* @__PURE__ */ jsx(SuspenseReact, { fallback: fallback || defaultFallback, children });
};

export {
  Suspense
};
