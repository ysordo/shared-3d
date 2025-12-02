'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense as SuspenseReact } from 'react';
export const Suspense = ({ children, fallback, loadingMessage = 'Loading 3D model...', }) => {
    const defaultFallback = (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50", children: _jsxs("div", { className: "bg-gray-900/90 border border-gray-700 rounded-xl p-8 shadow-2xl text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-xl font-semibold text-white", children: loadingMessage }), _jsx("p", { className: "text-sm text-gray-400 mt-2", children: "This may take a few seconds..." })] }) }));
    return _jsx(SuspenseReact, { fallback: fallback || defaultFallback, children: children });
};
//# sourceMappingURL=Suspense.js.map